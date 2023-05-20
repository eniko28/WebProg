import express from 'express';
import { insertTantargy } from '../db/tantargy.js';
import { insertAllomany } from '../db/allomany.js';
import { insertJelentkezes } from '../db/jelentkezes.js';

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

export async function requestJelentkezes(req, res, next) {
  try {
    await insertJelentkezes(req);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Sikertelen beszuras a jelentkezes tablaba: ${err.message}` });
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
