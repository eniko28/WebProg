import mysql from 'mysql2';
import autoBind from 'auto-bind';

export class DbConnection {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'webprog',
    });

    autoBind(this);
  }

  executeQuery(query, options = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, options, (error, results) => {
        if (error) {
          reject(new Error(`Hiba: '${query}: ${error}'`));
        }
        resolve(results);
      });
    });
  }
}

export default new DbConnection();
