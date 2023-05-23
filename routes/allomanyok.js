import express from 'express';
import * as dballomany from '../db/allomany.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/allomany', async (req, res) => {
  try {
    const allomanyok = await dballomany.findAllAllomany();
    const { id } = req.query;
    res.render('allomany.ejs', { allomanyok, id });
  } catch (err) {
    res.status(500).render('error', { message: `Az allomanyok listazasa sikertelen: ${err.message}` });
  }
});

router.post('/allomany', async (req, res) => {
  try {
    if (!req.files.feltoltendofile) {
      res.status(400).render('error', { message: 'Minden mezo kitoltese kotelezo!' });
      return;
    }
    const feltoltendofile = req.files.feltoltendofile.path.split('\\').pop();
    await dballomany.insertAllomany(req.fields.id, feltoltendofile);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `Az allomany beszurasa sikertelen: ${err.message}` });
  }
});

router.delete('/allomany/:nev', async (req, res) => {
  const { nev } = req.params;
  await dballomany.deleteByName(nev);
  res.send('Sikeres torles');
});

export default router;
