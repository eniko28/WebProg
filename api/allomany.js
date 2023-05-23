import express from 'express';
import * as dballomany from '../db/allomany.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const router = express.Router();
router.delete('/allomany/:nev', async (req, res) => {
  const { nev } = req.params;
  if (nev === '') {
    res.status(400).send('Hibas bemeneti adatok!');
  } else {
    await dballomany.deleteByName(nev);
    res.send('Sikeres torles');
  }
});

export default router;
