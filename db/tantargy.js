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
      labor INT,
      syllabus TEXT(10000)
    );
    `);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: tantárgy: ${err}`);
    process.exit(1);
  }
};

export const getEvfolyam = (a, b) => {
  const query = 'SELECT tantargy.evfolyam FROM tantargy WHERE tantargy.kod = ?';
  return dbConnection.executeQuery(query, [a, b]);
};

// visszateriti az adott informaciokat az osszes tantargyrol
export const findAllTantargy = () => {
  const query =
    'SELECT tantargy.kod, tantargy.nev, tantargy.evfolyam, tantargy.kurzus, tantargy.szemi, tantargy.labor FROM tantargy';
  return dbConnection.executeQuery(query);
};

// csak azokat a tantargyakat teriti vissza, amelyek hozza vannak rendelve az adott nevu tanarhoz
export const findAllTantargyTanar = (a) => {
  const query = ` SELECT tantargy.kod, tantargy.nev, tantargy.evfolyam, tantargy.kurzus, tantargy.szemi, tantargy.labor
     FROM tantargy JOIN jelentkezes on tantargy.kod = jelentkezes.tkod WHERE jelentkezes.fnev = ?`;
  return dbConnection.executeQuery(query, [a]);
};

// visszateriti a tantargy kurzus, szeminarium, illetve labor oraszamait
export const showDetails = (kod) => {
  const query = 'SELECT tantargy.kurzus, tantargy.szemi, tantargy.labor FROM tantargy WHERE tantargy.kod = ?';
  return dbConnection.executeQuery(query, [kod]);
};

// beszur a tantargy tablaba egy uj tantargyat
export const insertTantargy = (a, b, c, d, e, f) => {
  const query = 'INSERT INTO tantargy(kod, nev, evfolyam, kurzus, szemi, labor) VALUES (?, ?, ?, ?, ?, ?);';
  return dbConnection.executeQuery(query, [a, b, c, d, e, f]);
};

export const insertSyllabus = (syllabus, kod) => {
  const query = 'UPDATE tantargy SET syllabus = ? WHERE kod = ?;';
  return dbConnection.executeQuery(query, [syllabus, kod]);
};

// kod alapjan keres a tantargy tablaban
export const findTantargyKod = (a) => {
  const query =
    'SELECT tantargy.kod, tantargy.nev, tantargy.evfolyam, tantargy.kurzus, tantargy.szemi, tantargy.labor FROM tantargy WHERE tantargy.kod=?';
  return dbConnection.executeQuery(query, [a]);
};

// adott kodu tantargyrol visszateriti a syllabust, kodjat es nevet
export const getSyllabus = (a) => {
  const query = 'SELECT tantargy.syllabus, tantargy.kod, tantargy.nev FROM tantargy WHERE tantargy.kod=?';
  return dbConnection.executeQuery(query, [a]);
};
