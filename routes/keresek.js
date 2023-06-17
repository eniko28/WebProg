import express from 'express';
import * as dbOrak from '../db/orak.js';
import * as dbKeresek from '../db/keresek.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/keresek', authMiddleware(['Admin']), async (req, res) => {
  try {
    const orak = await dbKeresek.findAllKeres();
    res.render('keresek.ejs', { orak });
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a főoldal betöltésekor: ${err.message}` });
  }
});

router.post('/keresek', async (req, res) => {
  try {
    const valasz = req.fields.adminValasz;
    const tanarnev = req.fields.tnev;
    const tantargykod = req.fields.tkod;

    const keresek = await dbKeresek.findAllKeresbyTanarAndTantargy(tantargykod, tanarnev);
    if (valasz === 'igen') {
      await Promise.all([
        dbOrak.insertOra(
          keresek[0].tkod,
          keresek[0].tnev,
          keresek[0].mikor,
          keresek[0].mettol,
          keresek[0].meddig,
          keresek[0].evfolyam,
          keresek[0].tipus,
        ),
        dbKeresek.deleteKeres(keresek[0].tkod, keresek[0].tnev),
      ]);
    } else {
      await dbKeresek.deleteKeres(keresek[0].tkod, keresek[0].tnev);
    }
    res.redirect('/keresek');
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a keres beküldésekor: ${err.message}` });
  }
});

export default router;
