import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dbfelhasznalo from '../db/felhasznalok.js';
import * as dbtantargy from '../db/tantargy.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/', (req, res) => {
  try {
    res.render('login.ejs');
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a főoldal betöltésekor: ${err.message}` });
  }
});

dotenv.config();
const secret = process.env.SECRET;

router.post('/login', async (req, res) => {
  const password = req.fields.jelszo;
  const felhasznalo = req.fields.nev;
  const action = req.fields.felhasznaloTipusLogin;

  try {
    // ellenorzom, hogy minden mezo ki legyen toltve
    if (!password || !felhasznalo || !action) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
    } else {
      const [typeFromDatabase, felhasznalok, tantargyak, tantargyakTanar, nevek] = await Promise.all([
        dbfelhasznalo.getType(felhasznalo),
        dbfelhasznalo.getTeachers(),
        dbtantargy.findAllTantargy(),
        dbtantargy.findAllTantargyTanar(felhasznalo),
        dbfelhasznalo.selectUsers(),
      ]);

      // a felhasznalonev amit megadtunk nincs regisztralva meg
      const ok = nevek.some((obj) => obj.nev.includes(felhasznalo));
      if (!ok) {
        res.status(400).render('error', { message: 'A megadott névvel nincs felhasználó regisztrálva!' });
        return;
      }

      // a megadott felhasznalonev nem a neki megfelelo szerepkorrel probal bejelentkezni
      const type = JSON.stringify(typeFromDatabase[0].felhasznalo).replaceAll('"', '');
      if (type !== action) {
        res
          .status(400)
          .render('error', { message: 'A megadott felhasználónév nem ebben a szerepkörben van regisztrálva!' });
        return;
      }

      // jelszoellenorzes
      const passwordFromDatabase = await dbfelhasznalo.getPassword(felhasznalo);
      const match = await bcrypt.compare(password, passwordFromDatabase[0].jelszo);

      if (match) {
        // megcsinalom a tokent es visszakuldom cookieban
        const token = jwt.sign({ felhasznalo, action }, secret, { expiresIn: '7d' });
        res.cookie('Token', token);

        // a szerepkornek megfelelo oldalt renderel
        if (action === 'Vendég') {
          res.render('fooldal.ejs', { tantargyak, felhasznalo, action });
        } else if (action === 'Tanár') {
          res.render('fooldalTanar.ejs', { tantargyakTanar, felhasznalo, action });
          return;
        } else if (action === 'Admin') {
          res.render('fooldalAdmin.ejs', { tantargyak, felhasznalok, felhasznalo, action });
          return;
        }
      } else {
        res.status(400).render('error', { message: 'Hibás jelszavat adott meg. Próbálja újra!' });
        return;
      }
    }
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a bejelentkezés során: ${err.message}` });
  }
});

export default router;
