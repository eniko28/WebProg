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
  const talalt = tantargyak.some((tantargy) => tantargy.kod === req.fields.kod);
  if (talalt) {
    res.status(406).send('Van már ilyen kodu tantargy!');
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
  res.status(200).send('A tantargy sikeresen felveve!');
});

app.post('/allomanyok', (req, res) => {
  const talalt = tantargyak.some((tantargy) => tantargy.kod === req.fields.kod);
  if (!talalt) {
    res.status(406).send('Nem letezik ilyen kodu tantargy!');
    return;
  }
  // az allomanyt lementem az adott id-ju tantargyhoz
  const allomanykod = req.fields.kod;
  const ujallomany = req.files.feltoltendofile;
  const tantargyIndex = tantargyak.findIndex((tantargy) => tantargy.kod === allomanykod);
  tantargyak[tantargyIndex].allomanyok.push(ujallomany);
  res.status(200).send('Az allomany(ok) sikeresen feltoltve!');
});

app.post('/csatlakozni', (req, res) => {
  const { kod } = req.fields;
  const { usr } = req.fields;
  const action = req.fields['ki/be'];

  const tantargy = tantargyak.find((ujtantargy) => ujtantargy.kod === kod);
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
