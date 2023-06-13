import express from 'express';
import cookieParser from 'cookie-parser';
import * as dballomany from '../db/allomany.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/allomany', authMiddleware(['Tanár']), async (req, res) => {
  try {
    // lekeri a kodot a sablonbol
    const { id } = req.query;
    const allomanyok = await dballomany.findAllAllomanyById(id);
    res.render('allomany.ejs', { allomanyok, id });
  } catch (err) {
    res.status(500).render('error', { message: `Az állományok listázása sikertelen: ${err.message}` });
  }
});

router.post('/allomany', async (req, res) => {
  try {
    // ha valamelyik mezo ures, nem tolti fel az allomanyt, hibauzenetet kuld
    if (!req.files.feltoltendofile || req.files.fileNev) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }

    let files = req.files.feltoltendofile;
    const { id } = req.fields;

    // ha csak egy allomany kerul feltoltesre, akkor atalakul egy egy elemu tombbe
    if (!Array.isArray(files)) {
      files = [files];
    }

    // megvarja, hogy az osszes allomanyt beszurja es utana folytatja a vegrehajtast
    await Promise.all(
      files.map(async (file) => {
        const fileNev = file.name;
        const feltoltendofile = file.path.split('\\').pop();
        await dballomany.insertAllomany(id, fileNev, feltoltendofile);
      }),
    );

    // marad az oldalon es frissul
    res.redirect(`/allomany?id=${id}`);
  } catch (err) {
    res.status(500).render('error', { message: `Az állomány beszúrása sikertelen: ${err.message}` });
  }
});

export default router;
