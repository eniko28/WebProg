import express from 'express';
import cookieParser from 'cookie-parser';
import * as dbKeresek from '../db/keresek.js';
import * as dbfelhasznalo from '../db/felhasznalok.js';
import * as dbOrak from '../db/orak.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/orak', authMiddleware(['Tanár']), (req, res) => {
  try {
    const { id } = req.query;
    res.render('orak.ejs', { id });
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a főoldal betöltésekor: ${err.message}` });
  }
});

router.post('/orak', async (req, res) => {
  const tkod = req.fields.kod;
  const tnev = req.fields.nev;
  const tmikor = req.fields.mikor;
  const tmettol = req.fields.mettol;
  const tmeddig = req.fields.meddig;
  const oraTipus = req.fields.tipus;

  try {
    if (!tkod || !tnev || !tmikor || !tmettol || !tmeddig || !oraTipus) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }
    // egy ora kezdesi idopontja legyen kisebb mint a vegzodesi idopont
    if (tmettol > tmeddig) {
      res
        .status(400)
        .render('error', { message: 'Az óra kezdési időpontja korábbi kell legyen, mint a végzési időpont' });
      return;
    }
    // nem a sajat felhasznalonevet adta meg
    const joFelhasznalo = await dbfelhasznalo.selectTeacher(tnev);
    if (joFelhasznalo.length === 0) {
      res.status(400).render('error', { message: 'Hiba a felhasználónév megadásakor!' });
      return;
    }
    // egy tanar csak egyszer lehet benne egy adott szerepkorben egy adott tantargyban
    const letezikTanar = await dbOrak.selectTeacherByType(tkod, tnev, oraTipus);
    if (letezikTanar.length !== 0) {
      res
        .status(400)
        .render('error', { message: 'A tanár már szerepel ebben a szerepkörben a kiválasztott tantárgynál!' });
      return;
    }
    await dbKeresek.insertKeres(tkod, tnev, tmikor, tmettol, tmeddig, oraTipus);
    res.redirect(`/orak?id=${tkod}`);
  } catch (err) {
    res.status(500).render('error', { message: `Hiba: ${err.message}` });
  }
});

export default router;
