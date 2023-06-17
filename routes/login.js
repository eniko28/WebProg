import express from 'express';
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

const secret = '1c28d07215544bd1b24faccad6c14a04';

router.post('/login', async (req, res) => {
  const password = req.fields.jelszo;
  const felhasznalo = req.fields.nev;
  const action = req.fields.felhasznaloTipusLogin;

  try {
    if (!password || !felhasznalo || !action) {
      res.send('Minden mezo kitoltese kotelezo!');
    } else {
      const [typeFromDatabase, felhasznalok, tantargyak, tantargyakTanar] = await Promise.all([
        dbfelhasznalo.getType(felhasznalo),
        dbfelhasznalo.getTeachers(),
        dbtantargy.findAllTantargy(),
        dbtantargy.findAllTantargyTanar(felhasznalo),
      ]);

      const passwordFromDatabase = await dbfelhasznalo.getPassword(felhasznalo);
      const match = await bcrypt.compare(password, passwordFromDatabase[0].jelszo);

      if (match) {
        // megcsinalom a tokent es visszakuldom cookieban
        const token = jwt.sign({ felhasznalo, action }, secret, { expiresIn: '7d' });
        res.cookie('Token', token);

        if (action === typeFromDatabase[0].felhasznalo) {
          if (action === 'Vendég') {
            res.render('fooldal.ejs', { tantargyak, felhasznalo, action });
          } else if (action === 'Tanár') {
            res.render('fooldalTanar.ejs', { tantargyakTanar, felhasznalo, action });
          } else if (action === 'Admin') {
            res.render('fooldalAdmin.ejs', { tantargyak, felhasznalok, felhasznalo, action });
          }
        } else {
          res.send('Sikertelen bejelentkezés!');
        }
      } else {
        res.send('Nem jó a felhasználónév vagy jelszó');
        return;
      }
    }
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a bejelentkezés során: ${err.message}` });
  }
});

export default router;
