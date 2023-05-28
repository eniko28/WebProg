import express from 'express';
import * as dbtantargy from '../db/tantargy.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/', async (req, res) => {
  try {
    // tantargyakrol az informaciot lekeri, hogy majd meg lehessen oket az oldalon jeleniteni
    const tantargyak = await dbtantargy.findAllTantargy();
    res.render('fooldal.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgyak listázása sikertelen: ${err.message}` });
  }
});

router.get('/tantargy', async (req, res) => {
  try {
    const tantargyak = await dbtantargy.findAllTantargy();
    res.render('tantargy.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgy listázása sikertelen: ${err.message}` });
  }
});

router.post('/tantargy', async (req, res) => {
  try {
    // nem lehet uresen hagyott mezovel leadni az urlapot
    const { kod, nev, evfolyam, kurzus, szemi, labor } = req.fields;
    if (!kod || !nev || !evfolyam || !kurzus || !szemi || !labor) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }
    // nem lehet ket azonos koddal rendelkezo tantargy
    const bevezetettTantargyak = await dbtantargy.findTantargyKod(kod);
    if (bevezetettTantargyak.length !== 0) {
      res.status(400).render('error', { message: 'Van már ilyen kódú tantárgy!' });
      return;
    }
    await dbtantargy.insertTantargy(kod, nev, evfolyam, kurzus, szemi, labor);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgy beszúrása sikertelen: ${err.message}` });
  }
});

export default router;
