import express from 'express';
import * as dbtantargy from '../db/tantargy.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/fooldalAdmin/:kod', async (req, res) => {
  const { kod } = req.params;
  if (kod < 0 || kod === '') {
    res.status(400).send('Hiba: A tantárgy kódja egy pozitív szám kell legyen');
  } else {
    try {
      const tantargy = await dbtantargy.showDetails(kod);
      res.json(tantargy);
    } catch (err) {
      console.error('Hiba történt:', err);
      res.status(500).send('Hiba történt a lekérdezés során');
    }
  }
});

export default router;
