import dbConnection from './connection.js';

// letrehozza az allomany tablat, ha az meg nem letezik
export const createTableAllomany = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS allomany (
      id INT AUTO_INCREMENT PRIMARY KEY,
      kod INT,
      fileNev VARCHAR(50),
      nev VARCHAR(50));
    `);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: állomány: ${err}`);
    process.exit(1);
  }
};

// visszaterit minden oszlopot az allomany tablabol
export const findAllAllomany = () => {
  const query = 'SELECT * FROM allomany';
  return dbConnection.executeQuery(query);
};

// visszaterit minden oszlopott az allomany tablabol, amelynek a kodja adott
export const findAllAllomanyById = (id) => {
  const query = 'SELECT * FROM allomany WHERE allomany.kod = ?';
  return dbConnection.executeQuery(query, [id]);
};

// kitorli az allomany tablabol az adott nevu allomanyt
export const deleteByName = (nev) => {
  const query = 'DELETE FROM allomany WHERE allomany.nev = ?';
  return dbConnection.executeQuery(query, [nev]);
};

// beszurja az allomany tablaba az adott kodu, illetve nevu allomanyt
// le van mentve az a nev is, amivel az uploadDir mappaba berul es a rendes neve is
export const insertAllomany = (a, b, c) => {
  const query = 'INSERT INTO allomany(kod, fileNev, nev) VALUES (?, ?, ?);';
  return dbConnection.executeQuery(query, [a, b, c]);
};
