import dbConnection from './connection.js';

// letrehozza a tantargy tablat, ha az meg nincs letrehozva
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
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: tantárgy: ${err}`);
    process.exit(1);
  }
};

// visszateriti az osszes oszlopt a tantargy tablabol
export const findAllTantargy = () => {
  const query = 'SELECT * FROM tantargy';
  return dbConnection.executeQuery(query);
};

// visszateriti a tantargy kurzus, szeminarium, illetve labor oraszamait
export const showDetails = (kod) => {
  const query = 'SELECT tantargy.kurzus, tantargy.szemi, tantargy.labor FROM tantargy WHERE tantargy.kod = ?';
  return dbConnection.executeQuery(query, [kod]);
};

// beszur a tantargy tablaba egy uj tantargyat
export const insertTantargy = (a, b, c, d, e, f) => {
  const query = 'INSERT INTO tantargy VALUES (?, ?, ?, ?, ?, ?);';
  return dbConnection.executeQuery(query, [a, b, c, d, e, f]);
};

// kod alapjan keres a tantargy tablaban
export const findTantargyKod = (a) => {
  const query = 'SELECT * FROM tantargy WHERE tantargy.kod=?';
  return dbConnection.executeQuery(query, [a]);
};
