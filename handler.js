import express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import eformidable from 'express-formidable';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const tantargyak = [];
const csatlakozott = [];

const uploadDir = join(process.cwd(), 'uploadDir');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}
app.use(eformidable({ uploadDir, keepExtensions: true, multiples: true }));

app.post('/felvitel', (req, res) => {
  let talalt = false;
  for (let i = 0; i < tantargyak.length; i++) {
    if (tantargyak[i].kod === req.fields.kod) {
      talalt = true;
      break;
    }
  }
  if (talalt) {
    res.status(406).send('Van mar ilyen kodu tantargy!');
    return;
  }
  tantargyak.push({
    kod: req.fields.kod,
    nev: req.fields.nev,
    evfolyam: req.fields.evfolyam,
    kurzus: req.fields.kurzus,
    szemi: req.fields.szemi,
    labor: req.fields.labor,
    allomanyok: [],
  });
  console.log(tantargyak);
  res.status(200).send('A tantargy sikeresen felveve!');
});

app.post('/allomanyok', (req, res) => {
  let talalt = true;
  for (let i = 0; i < tantargyak.length; i++) {
    if (tantargyak[i].kod !== req.fields.kod) {
      talalt = false;
      break;
    }
  }
  if (!talalt) {
    res.status(406).send('Nem letezik ilyen kodu tantargy!');
    return;
  }
  res.status(200).send('Az allomany(ok) sikeresen feltoltve!');
});

app.post('/csatlakozni', (req, res) => {
  const { kod } = req.fields;
  const { usr } = req.fields;
  const action = req.fields['ki/be'];

  const tantargy = tantargyak.find((tantargyok) => tantargyok.kod === kod);
  if (!tantargy) {
    return res.status(406).send('Nem letezik ilyen kodu tantargy!');
  }
  const van = csatlakozott.find((csatlakozottmar) => csatlakozottmar.usr === usr);
  if (action === 'belep' && van) {
    return res.status(406).send('A diak mar csatlakozott ehhez a tantargyhoz!');
  }
  if (action === 'kilep' && !van) {
    return res.status(406).send('A diak nem resze ennek a tantargynak!');
  }

  if (action === 'belep') {
    csatlakozott.push({ usr: req.fields.usr });
    return res.send('A diak sikeresen hozza lett adva a tantargyhoz!');
  }
  if (action === 'kilep') {
    csatlakozott.pop({ usr: req.fields.usr });
    return res.status(200).send('A diak sikeresen kilepett!');
  }
  return res.redirect('/');
});

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/public/tantargy.html`);
});

app.listen(8080, () => {
  console.log('A szerver elindult a http://localhost:8080 címen.');
});
