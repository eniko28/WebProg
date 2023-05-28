import dbConnection from './connection.js';

// letrehozza a jelentkezes tablat, ha az meg nem volt letrehozva
export const createTableJelentkezes = async () => {
  try {
    await dbConnection.executeQuery(` CREATE TABLE IF NOT EXISTS jelentkezes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tkod INT,
      fnev VARCHAR(50),
      FOREIGN KEY (tkod) REFERENCES tantargy(kod),
      FOREIGN KEY (fnev) REFERENCES felhasznalo(nev));
    `);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: jelentkezés: ${err}`);
    process.exit(1);
  }
};

// visszateriti a jelentkezes tabla osszes oszlopat
export const findAllJelentkezes = () => {
  const query = 'SELECT * FROM jelentkezes';
  return dbConnection.executeQuery(query);
};

// beszur a jelentkezes tablaba egy adott felhaszanlot tantargykoddal egyutt
export const insertJelentkezes = (a, b) => {
  const query = 'INSERT INTO jelentkezes (tkod, fnev) VALUES (?, ?)';
  return dbConnection.executeQuery(query, [a, b]);
};

// megnezi, ha az adott diak szerepel mar az adott tantargynal
export const findDiakTantargyban = (a, b) => {
  const query = 'SELECT * FROM jelentkezes WHERE jelentkezes.tkod=? AND jelentkezes.fnev=?';
  return dbConnection.executeQuery(query, [a, b]);
};

// kitorol egy adott diakot egy adott tantargytol
export const deleteJelentkezes = (a, b) => {
  const query = 'DELETE FROM jelentkezes WHERE jelentkezes.fnev = ? AND jelentkezes.tkod= ?;';
  return dbConnection.executeQuery(query, [a, b]);
};
