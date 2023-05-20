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

app.use('/', tantargyRoutes);
app.use('/', allomanyRoutes);
app.use('/', jelentkezesRoutes);

app.use(errorMiddleware);

createTableTantargy()
  .then(() => createTableAllomany())
  .then(() => createTableJelentkezes())
  .then(() => {
    app.listen(7070, () => {
      console.log('A szerver elindult: http://localhost:7070/ ...');
    });
  })
  .catch((err) => {
    console.error('Hiba tortent a tablak letrehozasa soran:', err);
    process.exit(1);
  });
