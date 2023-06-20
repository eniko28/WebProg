import express from 'express';
import * as dbTantargy from '../db/tantargy.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/syllabus', authMiddleware(['Tanár']), async (req, res) => {
  try {
    const tantargyKod = req.query.tkod;
    const tantargyNev = req.query.tnev;
    const tanarNev = req.query.felhasznalo;
    const info = await dbTantargy.getSyllabus(tantargyKod);
    const syllabusInfo = info[0].syllabus;
    res.render('syllabus.ejs', { tantargyKod, tantargyNev, tanarNev, syllabusInfo });
  } catch (err) {
    res.status(500).render('error', { message: `Az adatok listázása sikertelen: ${err.message}` });
  }
});

router.post('/syllabus', async (req, res) => {
  const syllabus = req.fields.info;
  const tkod = req.fields.kod;
  const tnev = req.fields.nev;
  if (!syllabus) {
    res.status(400).render('error', { message: 'Kötelező syllabus-t megadni!' });
    return;
  }
  try {
    await dbTantargy.insertSyllabus(syllabus, tkod);
    res.redirect(`/fooldalTanar?felhasznalo=${tnev}&action=Tanár`);
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a syllabusnál: ${err.message}` });
  }
});

export default router;
