import express from 'express';
import cookieParser from 'cookie-parser';
import * as dbKeresek from '../db/keresek.js';
import * as dbTantargy from '../db/tantargy.js';
import * as dbOrak from '../db/orak.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.static('public'));

router.use(cookieParser());

router.get('/orak', authMiddleware(['Tanár']), (req, res) => {
  try {
    const { id } = req.query;
    res.render('orak.ejs', { id });
  } catch (err) {
    res.status(500).render('error', { message: `Hiba a főoldal betöltésekor: ${err.message}` });
  }
});

function ellenorizIdo(tmettol, tmeddig) {
  const ujmettol = tmettol;
  const ujmeddig = tmeddig;

  // Szetvalasztja a percet es az orat es atalakitja szamma
  const tmettolHour = parseInt(ujmettol.split(':')[0], 10);
  const tmettolMinute = parseInt(ujmettol.split(':')[1], 10);

  const tmeddigHour = parseInt(ujmeddig.split(':')[0], 10);
  const tmeddigMinute = parseInt(tmeddig.split(':')[1], 10);

  // Kiszamolja, hogy mekkora a kulonbseg a ket idopont kozott
  const idoDiffHours = tmeddigHour - tmettolHour;
  const idoDiffMinutes = tmeddigMinute - tmettolMinute;
  // ellenorzi, hogy az ora ne legyen hossszabb, mint 2 ora
  return idoDiffHours > 2 || (idoDiffHours === 2 && idoDiffMinutes > 0);
}

// ellenorzi, hogy a kivalsztott ora ne utkozzon egy mar elozoleg kivalasztottal
async function ellenorizOra(tmettol, tmeddig, tmikor) {
  const joOraKeresek = await dbKeresek.getOra(tmettol, tmeddig, tmikor);
  const joOraOrak = await dbOrak.getOra(tmettol, tmeddig, tmikor);
  if (joOraKeresek.length > 0 || joOraOrak.length > 0) {
    return false;
  }
  return true;
}

router.post('/orak', async (req, res) => {
  const tkod = req.fields.kod;
  const tnev = req.fields.nev;
  const tmikor = req.fields.mikor;
  const tmettol = req.fields.mettol;
  const tmeddig = req.fields.meddig;
  const oraTipus = req.fields.tipus;
  const tevfolyam = req.fields.evfolyam;

  try {
    if (!tnev || !tmikor || !tmettol || !tmeddig || !oraTipus || !tevfolyam) {
      res.status(400).render('error', { message: 'Minden mező kitöltése kötelező!' });
      return;
    }
    // egy ora kezdesi idopontja legyen korabbi mint a vegzodesi idopont
    if (tmettol > tmeddig) {
      res
        .status(400)
        .render('error', { message: 'Az óra kezdési időpontja korábbi kell legyen, mint a végzési időpont' });
      return;
    }

    // Egy ora hossza ne legyen hosszabb, mint 2 ora
    if (ellenorizIdo(tmettol, tmeddig)) {
      res.status(400).render('error', { message: 'Az időintervallum nem lehet több, mint 2 óra' });
      return;
    }

    // ellenorzi, hogy megfelelo evfolyamnak valasztotta-e ki az orat
    const joEvfolyam = await dbTantargy.getEvfolyam(tkod);
    const evfolyam = parseInt(tevfolyam, 10);
    if (joEvfolyam[0].evfolyam !== evfolyam) {
      res.status(400).render('error', { message: 'A kiválasztott tantárgy nem felel meg akiválasztott évfolyamnak' });
      return;
    }

    // ellenorzi, hogy a kivalasztott ora ne utkozzon egy masikkal
    if (!(await ellenorizOra(tmettol, tmeddig, tmikor))) {
      res.status(400).render('error', {
        message: 'A kiválasztott óra ütközik egy már kiválasztott órával! Válasszon más időpontot!',
      });
      return;
    }
    await dbKeresek.insertKeres(tkod, tnev, tmikor, tmettol, tmeddig, tevfolyam, oraTipus);

    res.redirect(`/fooldalTanar?felhasznalo=${tnev}`);
  } catch (err) {
    res.status(500).render('error', { message: `Hiba: ${err.message}` });
  }
});

export default router;
