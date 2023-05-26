import dbConnection from './connection.js';

export const createTableAllomany = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS allomany (
      id INT AUTO_INCREMENT PRIMARY KEY,
      kod INT,
      nev VARCHAR(50));
    `);
    // console.log('Állomány tábla sikeresen létrehozva');
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: állomány: ${err}`);
    process.exit(1);
  }
};

export const findAllAllomany = () => {
  const query = 'SELECT * FROM allomany';
  return dbConnection.executeQuery(query);
};

export const findAllAllomanyById = (id) => {
  const query = `SELECT * FROM allomany WHERE allomany.kod = ${id}`;
  return dbConnection.executeQuery(query);
};

export const deleteByName = (nev) => {
  const query = `DELETE FROM allomany WHERE allomany.nev = "${nev}"`;
  return dbConnection.executeQuery(query);
};

export const insertAllomany = (a, b) => {
  const query = `INSERT INTO allomany(kod, nev) VALUES (
      "${a}", "${b}");`;

  return dbConnection.executeQuery(query);
};
