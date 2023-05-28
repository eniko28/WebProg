import express from 'express';
import jwt from 'jsonwebtoken';
import * as dbfelhasznalo from '../db/felhasznalok.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const router = express.Router();

const users = await dbfelhasznalo.findAllFelhasznalo();
const secret = '1c28d07215544bd1b24faccad6c14a04';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] === password) {
    const token = jwt.sign({ username }, secret);
    res.send(`Sikeres belépés a következő tokennel: ${token}`);
  } else {
    res.status(401).send('Helytelen felhasználónév-jelszó kombináció.');
  }
});
