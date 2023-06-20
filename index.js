import express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import morgan from 'morgan';
import eformidable from 'express-formidable';
import errorMiddleware from './middleware/error.js';
import tantargyRoutes from './routes/tantargyak.js';
import allomanyRoutes from './routes/allomanyok.js';
import jelentkezesRoutes from './routes/jelentkezok.js';
import { createTableTantargy } from './db/tantargy.js';
import { createTableAllomany } from './db/allomany.js';
import { createTableJelentkezes } from './db/jelentkezes.js';
import { createTableFelhasznalo } from './db/felhasznalok.js';
import { createTableOrak } from './db/orak.js';
import { createTableKeresek } from './db/keresek.js';
import allomanyApi from './api/allomany.js';
import tantargyApi from './api/tantargyak.js';
import fooldalAdminApi from './api/fooldalAdmin.js';
import fooldalTanarApi from './api/fooldalTanar.js';
import loginRouter from './routes/login.js';
import orarendRouter from './routes/orarend.js';
import adatokRouter from './routes/adatok.js';
import registerRouter from './routes/register.js';
import allomanyVendeg from './routes/allomanyVendeg.js';
import fooldalTanar from './routes/fooldalTanar.js';
import fooldalAdmin from './routes/fooldalAdmin.js';
import orakRouter from './routes/orak.js';
import keresekRouter from './routes/keresek.js';
import syllabusRouter from './routes/syllabus.js';
import syllabusVendegRouter from './routes/syllabusVendeg.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const uploadDir = join(process.cwd(), 'uploadDir');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}
app.use(eformidable({ uploadDir, keepExtensions: true, multiples: true }));

app.use(express.static(uploadDir));

app.set('view engine', 'ejs');
app.set('views', join(process.cwd(), 'views'));

router.use(morgan('tiny'));

app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', tantargyRoutes);
app.use('/', allomanyVendeg);
app.use('/', fooldalAdminApi);
app.use('/', fooldalTanarApi);
app.use('/', orakRouter);
app.use('/', orarendRouter);
app.use('/', keresekRouter);
app.use('/', adatokRouter);
app.use('/', fooldalAdmin);
app.use('/', fooldalTanar);
app.use('/', allomanyRoutes);
app.use('/', syllabusRouter);
app.use('/', syllabusVendegRouter);
app.use('/', jelentkezesRoutes);
app.use('/', allomanyApi);
app.use('/', tantargyApi);

app.use(authMiddleware());
app.use(errorMiddleware);

createTableTantargy()
  .then(() => createTableAllomany())
  .then(() => createTableFelhasznalo())
  .then(() => createTableJelentkezes())
  .then(() => createTableOrak())
  .then(() => createTableKeresek())
  .then(() => {
    app.listen(7070, () => {
      console.log('A szerver elindult: http://localhost:7070/ ...');
    });
  })
  .catch((err) => {
    console.error('Hiba történt a táblák létrehozása során:', err);
    process.exit(1);
  });
