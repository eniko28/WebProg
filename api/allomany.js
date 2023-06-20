import express from 'express';
import fs from 'fs';
import * as dballomany from '../db/allomany.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const router = express.Router();

// torol egy megadott nevu allomanyt
router.delete('/allomany/:nev', async (req, res) => {
  const { nev } = req.params;
  const path = `./uploadDir/${nev}`;
  if (nev === '') {
    res.status(400).send('Hibásan megadott adatok!');
  } else {
    try {
      await dballomany.deleteByName(nev);
      // az uploadDir mappabol is torlom az allomanyt, nem csak az adatbazisbol
      fs.unlinkSync(path);
      res.send('Sikeres törlés');
    } catch (err) {
      console.error('Hiba történt:', err);
      res.status(500).send('Hiba történt a törlés során');
    }
  }
});

export default router;
