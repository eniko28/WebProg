import express from 'express';
import * as dballomany from '../db/allomany.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const router = express.Router();

router.delete('/allomany/:nev', async (req, res) => {
  const { nev } = req.params;
  if (nev === '') {
    res.status(400).send('Hibásan megadott adatok!');
  } else {
    try {
      await dballomany.deleteByName(nev);
      res.send('Sikeres törlés');
    } catch (err) {
      console.error('Hiba történt:', err);
      res.status(500).send('Hiba történt a törlés során');
    }
  }
});

export default router;
