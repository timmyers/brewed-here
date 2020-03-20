import * as SQLite from 'expo-sqlite';
(window as any).Expo = Object.freeze({ ...(window as any).Expo, SQLite });
import { createConnection, Connection } from 'typeorm/browser'
import { Visit } from './entities/visits';

let dbConn: Promise<Connection>;

export const connect = () => {
  if (dbConn == undefined) {
    dbConn = createConnection({
      database: 'db',
      driver: require('expo-sqlite'),
      entities: [
        Visit,
      ],
      synchronize: true,
      type: 'expo',
      logging: false,
    });
  }
}

// (async () => {
//   try {
//     const db = await dbConn;

//     const visitRepository = db.getRepository(Visit);
//   } catch (err) {
//     console.log(err)
//   }
// })()

export const getAllVisits = async () => {
  try {
    const db = await dbConn;

    const visitRepository = db.getRepository(Visit);
    const allVisits = await visitRepository.find()
    return allVisits;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const setVisited = async (breweryId: string, visited: boolean) => {
  try {
    const db = await dbConn;
    const visitRepository = db.getRepository(Visit);

    if (visited) {
      const visit = new Visit()
      visit.brewery = breweryId;
      await visitRepository.save(visit);
    } else {
      await visitRepository.delete({ brewery: breweryId })
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}