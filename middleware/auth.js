import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.urlencoded({ extended: true }));

const secret = '1c28d07215544bd1b24faccad6c14a04';

export function authMiddleware(requiredRoles) {
  return (req, res, next) => {
    const token = req.cookies.Token;
    if (!token) {
      res.status(401).json({ error: 'Hitelesítési hiba: Hiányzó token' });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, secret);
      const { felhasznalo, action } = decodedToken;

      if (!requiredRoles.includes(action)) {
        res.status(403).json({ error: 'Hitelesítési hiba: Jogosultsági hiba' });
        return;
      }

      req.felhasznalo = felhasznalo;
      req.action = action;
    } catch (err) {
      res.status(401).json({ error: `Hitelesítési hiba: Érvénytelen token: ${err}` });
      return;
    }
    next();
  };
}
