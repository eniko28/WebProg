import express from 'express';
import * as dbtantargy from '../db/tantargy.js';
import * as dbfelhasznalo from '../db/felhasznalok.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/tanarhozzaad', authMiddleware(['Tanar']), async (req, res) => {
  try {
    // az osszes felhasznalonevet, illetve az osszes tantargy kodjat amelyek szerepelnek az adatbazisban, lementi,
    // azert hogy majd meg tudja oket jeleniteni az oldalon
    const [felhasznalok, tantargyak] = await Promise.all([dbfelhasznalo.getTeachers(), dbtantargy.findAllTantargy()]);
    const { kod } = req.query;
    res.render('fooldalAdmin.ejs', { felhasznalok, kod, tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasználó listázása sikertelen: ${err.message}` });
  }
});

export default router;
