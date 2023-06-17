import dbConnection from './connection.js';

export const createTableKeresek = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS keresek (
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
    console.error(`Sikertelen táblalétrehozás: keresek: ${err}`);
    process.exit(1);
  }
};

export const findAllKeres = () => {
  const query = 'SELECT * FROM keresek';
  return dbConnection.executeQuery(query);
};

export const getOra = (a, b, c) => {
  const query = 'SELECT * FROM keresek WHERE keresek.mettol = ? AND keresek.meddig = ? AND keresek.mikor = ?';
  return dbConnection.executeQuery(query, [a, b, c]);
};

export const findAllKeresbyTanarAndTantargy = (a, b) => {
  const query = 'SELECT * FROM keresek WHERE keresek.tkod = ? and keresek.tnev = ?';
  return dbConnection.executeQuery(query, [a, b]);
};

export const insertKeres = (a, b, c, d, e, f, g) => {
  const query = 'INSERT INTO keresek (tkod, tnev, mikor, mettol, meddig, evfolyam, tipus) VALUES (?, ?, ?, ?, ?, ?, ?)';
  return dbConnection.executeQuery(query, [a, b, c, d, e, f, g]);
};

export const deleteKeres = (a, b) => {
  const query = 'DELETE FROM keresek WHERE keresek.tkod = ? AND keresek.tnev = ?';
  return dbConnection.executeQuery(query, [a, b]);
};

export const selectTeacherByType = (a, b, c) => {
  const query = 'SELECT * FROM keresek WHERE keresek.tkod = ? AND keresek.tnev = ? AND keresek.tipus = ?';
  return dbConnection.executeQuery(query, [a, b, c]);
};
