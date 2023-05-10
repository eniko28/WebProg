import express from 'express';
import path from 'path';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.js';
import requestRoutes from './routes/requests.js';
import { createTable } from './db/requests.js';

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

router.use(morgan('tiny'));

app.use('/', requestRoutes);
app.use('/allomany', requestRoutes);
app.use('/felhasznalo', requestRoutes);

app.use(errorMiddleware);

createTable().then(() => {
  app.listen(7070, () => {
    console.log('A szerver elindult: http://localhost:7070/ ...');
  });
});
