import express from 'express';
import * as dbtantargy from '../db/tantargy.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/fooldal', async (req, res) => {
  try {
    const tantargyak = await dbtantargy.findAllTantargy();
    res.render('fooldal.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgyak listázása sikertelen: ${err.message}` });
  }
});

router.get('/tantargy', authMiddleware(['Admin']), async (req, res) => {
  try {
    const tantargyak = await dbtantargy.findAllTantargy();
    res.render('tantargy.ejs', { tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgy listázása sikertelen: ${err.message}` });
  }
});

router.post('/tantargy', authMiddleware(['Admin']), async (req, res) => {
  try {
    const { kod, nev, evfolyam, kurzus, szemi, labor } = req.fields;
    if (!kod || !nev || !evfolyam || !kurzus || !szemi || !labor) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }

    const bevezetettTantargyak = await dbtantargy.findTantargyKod(kod);
    if (bevezetettTantargyak.length !== 0) {
      res.status(400).render('error', { message: 'Van már ilyen kódú tantárgy!' });
      return;
    }

    await dbtantargy.insertTantargy(kod, nev, evfolyam, kurzus, szemi, labor);
    res.redirect('/tanarhozzaad?felhasznalo=admin01&action=Admin');
  } catch (err) {
    res.status(500).render('error', { message: `A tantárgy beszúrása sikertelen: ${err.message}` });
  }
});

export default router;
