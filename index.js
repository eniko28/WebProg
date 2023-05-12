import express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import morgan from 'morgan';
import eformidable from 'express-formidable';
import errorMiddleware from './middleware/error.js';
import requestRoutes from './routes/requests.js';
import { createTable } from './db/requests.js';

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

app.use('/', requestRoutes);

app.use(errorMiddleware);

createTable().then(() => {
  app.listen(7070, () => {
    console.log('A szerver elindult: http://localhost:7070/ ...');
  });
});
