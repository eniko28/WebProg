import express from 'express';
import * as dbjelentkezes from '../db/jelentkezes.js';
import * as dbtantargy from '../db/tantargy.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/felhasznalo', async (req, res) => {
  try {
    const [felhasznalok, tantargyak] = await Promise.all([
      dbjelentkezes.findAllFelhasznalo(),
      dbtantargy.findAllTantargy(),
    ]);
    const { kod } = req.query;
    res.render('felhasznalo.ejs', { felhasznalok, kod, tantargyak });
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo listazasa sikertelen: ${err.message}` });
  }
});

router.post('/felhasznalo', async (req, res) => {
  try {
    if (!req.fields.kod || !req.fields.usr) {
      res.status(400).render('error', { message: 'Minden mezo kitoltese kotelezo!' });
      return;
    }
    const { kod, usr } = req.fields;
    const action = req.fields['ki/be'];
    const diaktantargyban = await dbjelentkezes.findDiakTantargyban(kod, usr);
    if (action === 'belep' && diaktantargyban.length === 0) {
      await dbjelentkezes.insertJelentkezes(kod, usr);
      res.render('success', { message: `A ${usr} felhasznalo sikeresen hozzaadva a ${kod}  tantargyhoz` });
    } else if (action === 'belep' && diaktantargyban.length !== 0) {
      res.render('success', { message: `A ${usr} felhasznalo mar be van jelentkezve a ${kod}  tantargyhoz` });
    } else if (action === 'kilep' && diaktantargyban.length !== 0) {
      await dbjelentkezes.deleteJelentkezes(kod, usr);
      res.render('success', { message: `A ${usr} felhasznalo sikeresen torolve a ${kod}  tantargybol` });
    } else if (action === 'kilep' && diaktantargyban.length === 0) {
      res.render('success', { message: `A ${usr} felhasznalo nincs bejelentkezve a ${kod}  tantargyhoz` });
    }
  } catch (err) {
    res.status(500).render('error', { message: `A felhasznalo eltavolitasa/beszurasa sikertelen: ${err.message}` });
  }
});

export default router;
