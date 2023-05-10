import express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import eformidable from 'express-formidable';
import * as db from '../db/requests.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const uploadDir = join(process.cwd(), 'uploadDir');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}
app.use(eformidable({ uploadDir, keepExtensions: true, multiples: true }));

router.get('/', async (req, res) => {
  try {
    const tantargyak = await db.findAllTantargy();
    res.render('fooldal.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantargyak listazasa sikertelen: ${err.message}` });
  }
});

router.get('/tantargy', async (req, res) => {
  try {
    const tantargyak = await db.findAllAllomany();
    res.render('tantargy.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantargy listazasa sikertelen: ${err.message}` });
  }
});

router.post('/tantargy', async (req, res) => {
  try {
    const { kod, nev, evfolyam, kurzus, szemi, labor } = await req.body;
    await db.insertTantargy(kod, nev, evfolyam, kurzus, szemi, labor);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `A tantargy beszurasa sikertelen: ${err.message}` });
  }
});

router.get('/allomany', async (req, res) => {
  try {
    const allomanyok = await db.findAllAllomany();
    res.render('allomany.ejs', { allomanyok });
  } catch (err) {
    res.status(500).render('error', { message: `Az allomanyok listazasa sikertelen: ${err.message}` });
  }
});

router.post('/allomany', async (req, res) => {
  try {
    const { feltoltendofile } = await req.body;
    await db.insertAllomany(feltoltendofile);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `Az allomany beszurasa sikertelen: ${err.message}` });
  }
});

router.get('/felhasznalo', async (req, res) => {
  try {
    const felhasznalok = await db.findAllFelhasznalo();
    res.render('felhasznalo.ejs', { felhasznalok });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo listazasa sikertelen: ${err.message}` });
  }
});

router.post('/felhasznalo', async (req, res) => {
  try {
    const { kod, usr } = await req.body;
    const action = await req.body['ki/be'];
    if (action === 'belep') {
      await db.insertFelhasznalo(kod, usr);
      res.redirect('/');
    } else {
      await db.deleteFelhasznalo(kod, usr);
      res.redirect('/');
    }
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo beszurasa sikertelen: ${err.message}` });
  }
});

export default router;
