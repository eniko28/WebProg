import express from 'express';
import * as dbtantargy from '../db/tantargy.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/fooldalTanar', authMiddleware(['Tanár']), async (req, res) => {
  try {
    // const felhasznalok = await dbfelhasznalo.getTeachers();
    const { felhasznalo, action } = req.query;
    const tantargyakTanar = await dbtantargy.findAllTantargyTanar(felhasznalo);
    res.render('fooldalTanar.ejs', { tantargyakTanar, felhasznalo, action });
  } catch (err) {
    res.status(500).render('error', { message: `Az állományok listázása sikertelen: ${err.message}` });
  }
});

export default router;
