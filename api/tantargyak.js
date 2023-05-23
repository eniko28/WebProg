import express from 'express';
import * as dbtantargy from '../db/tantargy.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/fooldal/:kod', async (req, res) => {
  const { kod } = req.params;
  if (kod < 0 || kod === '') {
    res.status(400).send('Hiba: A tantargy kodja egy pozitiv szam kell legyen');
  } else {
    const tantargy = await dbtantargy.showDetails(kod);
    res.json(tantargy);
  }
});

export default router;
