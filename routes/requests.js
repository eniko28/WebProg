import express from 'express';
import * as db from '../db/requests.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

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
    const { kod, nev, evfolyam, kurzus, szemi, labor } = req.fields;
    if (!kod || !nev || !evfolyam || !kurzus || !szemi || !labor) {
      res.status(400).render('error', { message: 'Minden mezo kitoltese kotelezo!' });
      return;
    }
    const bevezetettTantargyak = await db.findTantargyKod(kod);
    if (bevezetettTantargyak.length !== 0) {
      res.status(400).render('error', { message: 'Van mar ilyen kodu tantargy!' });
      return;
    }
    await db.insertTantargy(kod, nev, evfolyam, kurzus, szemi, labor);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `A tantargy beszurasa sikertelen: ${err.message}` });
  }
});

router.get('/allomany', async (req, res) => {
  try {
    const allomanyok = await db.findAllAllomany();
    const { id } = req.query;
    res.render('allomany.ejs', { allomanyok, id });
  } catch (err) {
    res.status(500).render('error', { message: `Az allomanyok listazasa sikertelen: ${err.message}` });
  }
});

router.post('/allomany', async (req, res) => {
  try {
    if (!req.files.feltoltendofile) {
      res.status(400).render('error', { message: 'Minden mezo kitoltese kotelezo!' });
      return;
    }
    const feltoltendofile = req.files.feltoltendofile.path.split('\\').pop();
    await db.insertAllomany(req.fields.id, feltoltendofile);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `Az allomany beszurasa sikertelen: ${err.message}` });
  }
});

router.get('/felhasznalo', async (req, res) => {
  try {
    const felhasznalok = await db.findAllFelhasznalo();
    const tantargyak = await db.findAllTantargy();
    const { kod } = req.query;
    res.render('felhasznalo.ejs', { felhasznalok, kod, tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo listazasa sikertelen: ${err.message}` });
  }
});

router.post('/felhasznalo', async (req, res) => {
  try {
    if (!req.fields.kod || !req.fields.usr) {
      res.status(400).render('error', { message: 'Minden mezo kitoltese kotelezo!' });
      return;
    }
    const { kod, usr } = req.fields;
    const action = req.fields['ki/be'];
    const diaktantargyban = await db.findDiakTantargyban(kod, usr);
    if (action === 'belep' && diaktantargyban.length === 0) {
      await db.insertJelentkezes(kod, usr);
      res.render('success', { message: `A ${usr} felhasznalo sikeresen hozzaadva a ${kod}  tantargyhoz` });
    } else if (action === 'belep' && diaktantargyban.length !== 0) {
      res.render('success', { message: `A ${usr} felhasznalo mar be van jelentkezve a ${kod}  tantargyhoz` });
    } else if (action === 'kilep' && diaktantargyban.length !== 0) {
      await db.deleteJelentkezes(kod, usr);
      res.render('success', { message: `A ${usr} felhasznalo sikeresen torolve a ${kod}  tantargynol` });
    } else if (action === 'kilep' && diaktantargyban.length === 0) {
      res.render('success', { message: `A ${usr} felhasznalo nincs bejelentkezve a ${kod}  tantargyhoz` });
    }
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo eltavolitasa/beszurasa sikertelen: ${err.message}` });
  }
});

export default router;
