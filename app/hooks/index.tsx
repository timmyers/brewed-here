import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { Region } from 'react-native-maps';
import { setVisited, getAllVisits } from '../db';

const defaultState = {
  visited: {},
};

function reducer(state = defaultState, action: any = {}) {
  console.log('REDUCER', action.type)
  switch (action.type) {
    case 'SET_ALL_VISITED':
      return { ...state, visited: action.visited };
    default:
      return state;
  }
}

const StoreContext = React.createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useMapRegion = (): [Region, React.Dispatch<React.SetStateAction<Region>>] => {
  const initialRegion: Region = {
    latitude: 39.740774,
    longitude: -105.010832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [mapRegion, setMapRegion] = useState(initialRegion)

  return [mapRegion, setMapRegion];
}

export const useBreweries = () => {
  const [breweries, setBreweries] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const breweries = await axios.get('https://api.brewedhere.co');
        setBreweries(breweries.data);
      } catch (err) {
        console.log(err);
      }
    })()
  }, []);

  return breweries;
}

export const useLoadBreweriesVisited = () => {
  const { state, dispatch } = useContext(StoreContext);
  useEffect(() => {
    (async () => {
      const dbVisits = await getAllVisits();
      const dbVisitsMap = {}
      dbVisits.forEach((dbVisit) => {
        dbVisitsMap[dbVisit.brewery] = true;
      })
      dispatch({type: 'SET_ALL_VISITED', visited: dbVisitsMap });
    })()
  }, [])
}

export const useBreweryVisited = (breweryID: string): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const { state, dispatch } = useContext(StoreContext);
  const breweryVisited = state.visited;

  const setVisitedRet = async (visited: boolean) => {
    await setVisited(breweryID, visited);
    const newVisited = { ...breweryVisited, [breweryID]: visited }
    dispatch({type: 'SET_ALL_VISITED', visited: newVisited });
  }

  if (breweryVisited[breweryID] === undefined) {
    return [false, setVisitedRet];
  }

  return [breweryVisited[breweryID], setVisitedRet];
}