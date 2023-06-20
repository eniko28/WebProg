import express from 'express';
import * as dbjelentkezes from '../db/jelentkezes.js';
import * as dbtantargy from '../db/tantargy.js';
import * as dbfelhasznalo from '../db/felhasznalok.js';
import * as dbOrak from '../db/orak.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/tanarhozzaad', authMiddleware(['Admin']), async (req, res) => {
  try {
    // az osszes felhasznalonevet, illetve az osszes tantargy kodjat amelyek szerepelnek az adatbazisban, lementi,
    // azert hogy majd meg tudja oket jeleniteni az oldalon
    const [felhasznalok, tantargyak] = await Promise.all([
      dbfelhasznalo.findAllFelhasznalo(),
      dbtantargy.findAllTantargy(),
    ]);
    const { kod } = req.query;
    res.render('fooldalAdmin.ejs', { felhasznalok, kod, tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasználó listázása sikertelen: ${err.message}` });
  }
});

router.post('/tanarhozzaad', async (req, res) => {
  try {
    if (!req.fields.kod || !req.fields.usr) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }

    // lekeri a kodot, a felhasznalonevet, illetve azt, hogy be vagy ki akar lepni egy tantargyba/bol
    // minden esetben uzenetet kap arrol hogy sikeres volt-e a belepes/kilepes, illetve ha nem, volt sikeres, akkor miert nem
    const { kod, usr } = req.fields;
    const action = req.fields['ki/be'];
    const tanartantargyban = await dbjelentkezes.findTanarTantargyban(kod, usr);
    if (action === 'belep' && tanartantargyban.length === 0) {
      await dbjelentkezes.insertJelentkezes(kod, usr);
      res.render('success.ejs', {
        usr,
        message: `A ${usr} tanár sikeresen hozzárendelve a ${kod} tantárgyhoz!`,
      });
    } else if (action === 'belep' && tanartantargyban.length !== 0) {
      res.render('success.ejs', {
        usr,
        message: `A ${usr} felhasználó már hozzá van adva a ${kod} tantárgyhoz!`,
      });
    } else if (action === 'kilep' && tanartantargyban.length !== 0) {
      // ha a tanart toroljuk egy adott tantargytol, akkor az orarendben is toroljuk
      await Promise.all([dbjelentkezes.deleteJelentkezes(kod, usr), dbOrak.deleteOra(kod, usr)]);
      res.render('success.ejs', {
        usr,
        message: `A ${usr} tanár sikeresen törölve a ${kod} tantárgytól!`,
      });
    } else if (action === 'kilep' && tanartantargyban.length === 0) {
      res.render('success.ejs', {
        usr,
        message: `A ${usr} tanár nincs hozzárendelve még a ${kod} tantárgyhoz!`,
      });
    }
  } catch (err) {
    res.status(500).render('error', { message: `Hiba: ${err.message}` });
  }
});

export default router;
