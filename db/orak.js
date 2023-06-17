import dbConnection from './connection.js';

// letrehozza az orak tablat, ha az meg nem volt letrehozva
export const createTableOrak = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS orak (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tkod INT,
        tnev VARCHAR(50),
        mikor VARCHAR(50),
        mettol TIME,
        meddig TIME,
        evfolyam INT,
        tipus VARCHAR(50)
      )`);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: orak: ${err}`);
    process.exit(1);
  }
};

// visszateriti az osszes oszlopt az orak tablabol
export const findAllOra = () => {
  const query = 'SELECT * FROM orak';
  return dbConnection.executeQuery(query);
};

// visszateriti egy adott id-ju tanar orarendjet
export const getOrarend = (a) => {
  const query = 'SELECT * FROM orak WHERE orak.tnev = ?';
  return dbConnection.executeQuery(query, [a]);
};

// beszur egy uj orat az orarendbe
export const insertOra = (a, b, c, d, e, f, g) => {
  const query = 'INSERT INTO orak (tkod, tnev, mikor, mettol, meddig, evfolyam, tipus)VALUES (?, ?, ?, ?, ?, ?, ?)';
  return dbConnection.executeQuery(query, [a, b, c, d, e, f, g]);
};

// torli az adott orat az orarendbol
export const deleteOra = (a, b) => {
  const query = 'DELETE FROM orak WHERE orak.tkod = ? AND orak.tnev= ?;';
  return dbConnection.executeQuery(query, [a, b]);
};

// kivalasztja azt a tanart, aki be van osztva egy adott tantargyhoz
export const selectTeacherByType = (a, b, c) => {
  const query = 'SELECT * FROM orak WHERE orak.tkod = ? AND orak.tnev = ? AND orak.tipus = ?';
  return dbConnection.executeQuery(query, [a, b, c]);
};
