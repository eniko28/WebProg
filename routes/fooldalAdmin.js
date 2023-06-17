import express from 'express';
import * as dbtantargy from '../db/tantargy.js';
import * as dbfelhasznalo from '../db/felhasznalok.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/tanarhozzaad', authMiddleware(['Admin']), async (req, res) => {
  try {
    const { felhasznalo, action } = req.query;
    const [felhasznalok, tantargyak] = await Promise.all([dbfelhasznalo.getTeachers(), dbtantargy.findAllTantargy()]);
    res.render('fooldalAdmin.ejs', { tantargyak, felhasznalok, felhasznalo, action });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasználó listázása sikertelen: ${err.message}` });
  }
});

export default router;
