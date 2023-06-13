import dbConnection from './connection.js';

// letrehozza a keresek tablat, ha az meg nem volt letrehozva
export const createTableKeresek = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS keresek (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tkod INT,
        tnev VARCHAR(50),
        mikor VARCHAR(50),
        mettol TIME,
        meddig TIME,
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

export const findAllKeresbyTanarAndTantargy = (a, b) => {
  const query = 'SELECT * FROM keresek WHERE keresek.tkod = ? and keresek.tnev = ?';
  return dbConnection.executeQuery(query, [a, b]);
};

export const insertKeres = (a, b, c, d, e, f) => {
  const query = 'INSERT INTO keresek (tkod, tnev, mikor, mettol, meddig, tipus)VALUES (?, ?, ?, ?, ?, ?)';
  return dbConnection.executeQuery(query, [a, b, c, d, e, f]);
};

export const deleteKeres = (a, b) => {
  const query = 'DELETE FROM keresek WHERE keresek.tkod = ? AND keresek.tnev= ?;';
  return dbConnection.executeQuery(query, [a, b]);
};
