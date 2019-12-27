import * as SQLite from 'expo-sqlite';
(window as any).Expo = Object.freeze({ ...(window as any).Expo, SQLite });
import { createConnection, getRepository } from 'typeorm/browser'
import { Visit } from './entities/visits';

const dbConn = createConnection({
  database: 'db',
  entities: [
    Visit,
  ],
  synchronize: true,
  type: 'expo',
  logging: true,
});

(async () => {
  try {
    const db = await dbConn;

    const visitRepository = db.getRepository(Visit);
  } catch (err) {
    console.log(err)
  }
})()

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