import express from 'express';
import cookieParser from 'cookie-parser';
import * as dbOrak from '../db/orak.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/orarend', authMiddleware(['Tanár']), async (req, res) => {
  try {
    const { tkod } = req.query;
    const tantargyak = await dbOrak.getOrarend(tkod);
    res.render('orarend.ejs', { tantargyak, tkod });
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a főoldal betöltésekor: ${err.message}` });
  }
});

export default router;
