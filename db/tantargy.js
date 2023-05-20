import dbConnection from './connection.js';

export const createTableTantargy = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS tantargy (
      kod INT PRIMARY KEY,
      nev VARCHAR(50),
      evfolyam INT,
      kurzus INT,
      szemi INT,
      labor INT);
    `);
    console.log('Tantargy tabla sikeresen letrehozva');
  } catch (err) {
    console.error(`Sikertelen tablaletrehozas: tantargy: ${err}`);
    process.exit(1);
  }
};

export const findAllTantargy = () => {
  const query = 'SELECT tantargy.kod, tantargy.nev, tantargy.evfolyam FROM tantargy';
  return dbConnection.executeQuery(query);
};

export const findAllFelhasznalo = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const insertTantargy = (a, b, c, d, e, f) => {
  const query = `INSERT INTO tantargy VALUES (
    "${a}", "${b}", "${c}", "${d}", "${e}", "${f}");`;

  return dbConnection.executeQuery(query);
};

export const findTantargyKod = (a) => {
  const query = `SELECT * FROM tantargy WHERE tantargy.kod="${a}"`;
  return dbConnection.executeQuery(query);
};
