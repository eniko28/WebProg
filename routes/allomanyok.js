import express from 'express';
import * as dballomany from '../db/allomany.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/allomany', async (req, res) => {
  try {
    const { id } = req.query;
    const allomanyok = await dballomany.findAllAllomanyById(id);
    res.render('allomany.ejs', { allomanyok, id });
  } catch (err) {
    res.status(500).render('error', { message: `Az állományok listázása sikertelen: ${err.message}` });
  }
});

router.post('/allomany', async (req, res) => {
  try {
    if (!req.files.feltoltendofile) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }
    const feltoltendofile = req.files.feltoltendofile.path.split('\\').pop();
    await dballomany.insertAllomany(req.fields.id, feltoltendofile);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `Az állomány beszúrása sikertelen: ${err.message}` });
  }
});

export default router;
