import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import * as dbfelhasznalo from '../db/felhasznalok.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/register', (req, res) => {
  try {
    res.render('register.ejs');
  } catch (err) {
    res.status(500).render('error', { message: `Hiba az oldal betöltésekor: ${err.message}` });
  }
});

router.post('/register', async (req, res) => {
  const password = req.fields.jelszo;
  const felhasznalo = req.fields.nev;
  const action = req.fields.felhasznaloTipusRegister;

  // uresen hagyott mezovel nem lehet bekuldeni az urlapot
  if (!password || !felhasznalo || !action) {
    res.send('Minden mezo kitoltese kotelezo');
  } else {
    try {
      const [hashWithSalt, users] = await Promise.all([
        bcrypt.hash(password, 10),
        dbfelhasznalo.bejelentkezettFelhaasznalok(felhasznalo),
      ]);

      // nem lehet regisztralni egy olyan felhasznalonevvel, amivel mar letezik felhasznalo
      if (users.length !== 0) {
        res.send('Foglalt felhasznalonev!');
        return;
      }

      await dbfelhasznalo.insertNewUser(felhasznalo, hashWithSalt, action);

      res.redirect('/tanarhozzaad?felhasznalo=admin01&action=Admin');
    } catch (err) {
      res.status(500).render('error', { message: `Sikertelen új felhasználó beszúrás az adatbázisba: ${err.message}` });
    }
  }
});

export default router;
