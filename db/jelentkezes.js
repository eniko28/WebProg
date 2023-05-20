import dbConnection from './connection.js';

export const createTableJelentkezes = async () => {
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
};

export const findAllFelhasznalo = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const findAllJelentkezes = () => {
  const query = 'SELECT * FROM jelentkezes';
  return dbConnection.executeQuery(query);
};

export const insertJelentkezes = (a, b) => {
  const query = `INSERT INTO jelentkezes (tkod, fnev) VALUES ("${a}", "${b}")`;
  return dbConnection.executeQuery(query);
};

export const findDiakTantargyban = (a, b) => {
  const query = `SELECT * FROM jelentkezes WHERE jelentkezes.tkod="${a}" AND jelentkezes.fnev="${b}"`;
  return dbConnection.executeQuery(query);
};

export const deleteJelentkezes = (a, b) => {
  const query = `DELETE FROM jelentkezes WHERE jelentkezes.fnev = "${b}" AND jelentkezes.tkod= "${a}";`;
  return dbConnection.executeQuery(query);
};
