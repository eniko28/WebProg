import dbConnection from './connection.js';

export const createTable = async () => {
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
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
      nev VARCHAR(50) PRIMARY KEY)
    `);
    console.log('Felhasznalo tabla sikeresen letrehozva');
  } catch (err) {
    console.error(`Sikertelen tablaletrehozas: felhasznalo: ${err}`);
    process.exit(1);
  }
  try {
    await dbConnection.executeQuery(` CREATE TABLE IF NOT EXISTS jelentkezes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tkod INT,
      fnev VARCHAR(50),
      FOREIGN KEY (tkod) REFERENCES tantargy(kod),
      FOREIGN KEY (fnev) REFERENCES felhasznalo(nev));
    `);
    console.log('Jelentkezes tabla sikeresen letrehozva');
  } catch (err) {
    console.error(`Sikertelen tablaletrehozas: jelentkezes: ${err}`);
    process.exit(1);
  }
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS allomany (
      id INT AUTO_INCREMENT PRIMARY KEY,
      kod INT,
      nev VARCHAR(50));
    `);
    console.log('Allomany tabla sikeresen letrehozva');
  } catch (err) {
    console.error(`Sikertelen tablaletrehozas: allomany: ${err}`);
    process.exit(1);
  }
};

export const findAllTantargy = () => {
  const query = 'SELECT * FROM tantargy';
  return dbConnection.executeQuery(query);
};

export const findAllFelhasznalo = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const findAllJelentkezes = () => {
  const query = 'SELECT * FROM jelentkezes';
  return dbConnection.executeQuery(query);
};

export const findAllAllomany = () => {
  const query = 'SELECT * FROM allomany';
  return dbConnection.executeQuery(query);
};

export const insertTantargy = (a, b, c, d, e, f) => {
  const query = `INSERT INTO tantargy VALUES (
    "${a}", "${b}", "${c}", "${d}", "${e}", "${f}");`;

  return dbConnection.executeQuery(query);
};

export const insertJelentkezes = (a, b) => {
  const query = `INSERT INTO jelentkezes (tkod, fnev) VALUES ("${a}", "${b}")`;
  return dbConnection.executeQuery(query);
};

export const insertAllomany = (a, b) => {
  const query = `INSERT INTO allomany(kod, nev) VALUES (
    "${a}", "${b}");`;

  return dbConnection.executeQuery(query);
};

export const deleteJelentkezes = (a, b) => {
  const query = `DELETE FROM jelentkezes WHERE jelentkezes.fnev = "${b}" AND jelentkezes.tkod= "${a}";`;
  return dbConnection.executeQuery(query);
};

export const findTantargyKod = (a) => {
  const query = `SELECT * FROM tantargy WHERE tantargy.kod="${a}"`;
  return dbConnection.executeQuery(query);
};

export const findDiakTantargyban = (a, b) => {
  const query = `SELECT * FROM jelentkezes WHERE jelentkezes.tkod="${a}" AND jelentkezes.fnev="${b}"`;
  return dbConnection.executeQuery(query);
};
