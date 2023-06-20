import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as dbfelhasznalo from '../db/felhasznalok.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/adatok', authMiddleware(['Vendég', 'Admin', 'Tanár']), (req, res) => {
  try {
    const felhasznaloNev = req.query.felhasznalo;
    const tipus = req.query.action;
    res.render('adatok.ejs', { felhasznaloNev, tipus });
  } catch (err) {
    res.status(500).render('error', { message: `Az adatok listázása sikertelen: ${err.message}` });
  }
});

router.post('/adatok', async (req, res) => {
  try {
    const ujNev = req.fields.nev;
    const regiNev = req.fields.nevRegi;
    const bevezetettNevek = await dbfelhasznalo.selectUsers();
    // az uj felhasznalonevnek kulonboznie kell az aktualistol
    if (ujNev === regiNev) {
      res.status(500).render('error', { message: 'Az új felhasználónévnek különböznie kell a regitől!' });
      return;
    }
    const ok = bevezetettNevek.some((obj) => obj.nev.includes(ujNev));
    if (ok) {
      res.status(400).render('error', { message: 'A megadott névvel már van felhasználó regisztrálva!' });
      return;
    }
    await dbfelhasznalo.updateFelhasznalo(ujNev, regiNev);
    res.redirect(`/adatok?felhasznalo=${ujNev}&action=Vendég`);
  } catch (err) {
    res.status(500).render('error', { message: `Hiba:  ${err.message}` });
  }
});

export default router;
