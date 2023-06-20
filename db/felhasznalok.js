// import bcrypt from 'bcrypt';
import dbConnection from './connection.js';

// letrehozza az felhasznalo tablat, ha az meg nem letezik
export const createTableFelhasznalo = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
      nev VARCHAR(50) PRIMARY KEY,
      jelszo VARCHAR(256),
      felhasznalo VARCHAR(50)
    );
      `);
    await dbConnection.executeQuery(`
      INSERT INTO felhasznalo (nev, jelszo, felhasznalo)
      SELECT 'admin01', '$2b$10$PWTYAlbeqyHwbbMxgrGsB.kgk.IeukIce0dcAMkRjfY861u8iHLRS', 'Admin'
      WHERE NOT EXISTS (
        SELECT 1 FROM felhasznalo WHERE nev = 'admin01' AND jelszo = '$2b$10$PWTYAlbeqyHwbbMxgrGsB.kgk.IeukIce0dcAMkRjfY861u8iHLRS' 
        AND felhasznalo = 'Admin'
      );
    `);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: felhasználó: ${err}`);
    process.exit(1);
  }
};

export const findAllFelhasznalo = () => {
  const query = 'SELECT felhasznalo.nev FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

// visszateriti az adott nevu felhasznalorol az informaciokat
export const bejelentkezettFelhaasznalok = (a) => {
  const query = 'SELECT * FROM felhasznalo WHERE felhasznalo.nev = ?';
  return dbConnection.executeQuery(query, [a]);
};

export const findAllFelhasznaloNev = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

// az osszes felhasznalo nevet teriti vissza
export const selectUsers = () => {
  const query = 'SELECT felhasznalo.nev FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

// beszur egy uj felhasznalot a tablaba
export const insertNewUser = (a, b, c) => {
  const query = 'INSERT INTO felhasznalo VALUES (?, ?, ?)';
  return dbConnection.executeQuery(query, [a, b, c]);
};

export const getPassword = (a) => {
  const query = 'SELECT felhasznalo.jelszo FROM felhasznalo WHERE felhasznalo.nev = ?';
  return dbConnection.executeQuery(query, [a]);
};

// az adott nevu felhasznalonak a szerepkoret teriti vissza
export const getType = (a) => {
  const query = 'SELECT felhasznalo.felhasznalo FROM felhasznalo WHERE felhasznalo.nev = ?';
  return dbConnection.executeQuery(query, [a]);
};

// visszateriti az osszes Tanar szerepkorben beosztott felhasznalo nevet
export const getTeachers = () => {
  const query = 'SELECT felhasznalo.nev FROM felhasznalo WHERE felhasznalo.felhasznalo = "Tanár"';
  return dbConnection.executeQuery(query);
};

export const selectTeacher = (a) => {
  const query = 'SELECT felhasznalo.nev FROM felhasznalo WHERE felhasznalo.felhasznalo = "Tanár" AND felhasznalo.nev=?';
  return dbConnection.executeQuery(query, [a]);
};

export const updateFelhasznalo = (a, b) => {
  const query = 'UPDATE felhasznalo SET felhasznalo.nev = ? WHERE felhasznalo.nev = ?';
  return dbConnection.executeQuery(query, [a, b]);
};
