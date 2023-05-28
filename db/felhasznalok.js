// visszateriti a felhasznalo tabla osszes oszlopat
import dbConnection from './connection.js';

// letrehozza az felhasznalo tablat, ha az meg nem letezik
export const createTableFelhasznalo = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
        nev VARCHAR(50) PRIMARY KEY,
        jelszo VARCHAR(50)
      );
      `);
  } catch (err) {
    console.error(`Sikertelen táblalétrehozás: felhasználó: ${err}`);
    process.exit(1);
  }
};

export const findAllFelhasznalo = () => {
  const query = 'SELECT felhasznalo.nev FROM felhasznalo';
  return dbConnection.executeQuery(query);
};
