import express from 'express';
import { insertTantargy, insertAllomany, insertJelentkezes } from '../db/requests.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

export default async function requestTantargy(req, res, next) {
  try {
    await insertTantargy(req);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Sikertelen beszuras a tantargy tablaba: ${err.message}` });
  }
}

export async function requestFelhasznalo(req, res, next) {
  try {
    await insertJelentkezes(req);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Sikertelen beszuras a felhasznalok tablaba: ${err.message}` });
  }
}

export async function requestAllomany(req, res, next) {
  try {
    await insertAllomany(req);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Sikertelen beszuras az allomanyok tablaba: ${err.message}` });
  }
}
