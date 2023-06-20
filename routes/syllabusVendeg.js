import express from 'express';
import * as dbTantargy from '../db/tantargy.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/syllabusVendeg', authMiddleware(['Vendég']), async (req, res) => {
  try {
    const tantargyKod = req.query.id;
    const info = await dbTantargy.getSyllabus(tantargyKod);
    const syllabusInfo = info[0].syllabus;
    const tantargyNev = info[0].nev;
    res.render('syllabusVendeg.ejs', { syllabusInfo, tantargyNev });
  } catch (err) {
    res.status(500).render('error', { message: `Az adatok listázása sikertelen: ${err.message}` });
  }
});

export default router;
