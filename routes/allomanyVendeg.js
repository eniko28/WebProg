import express from 'express';
import * as dballomany from '../db/allomany.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.get('/allomanyVendeg', authMiddleware(['Vendég', 'Admin']), async (req, res) => {
  try {
    // lekeri a kodot a sablonbol
    const { id } = req.query;
    const allomanyok = await dballomany.findAllAllomanyById(id);
    res.render('allomanyVendeg.ejs', { allomanyok, id });
  } catch (err) {
    res.status(500).render('error', { message: `Az állományok listázása sikertelen: ${err.message}` });
  }
});

export default router;
