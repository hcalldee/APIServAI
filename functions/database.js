require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql');

// Create a pool with environment variables
const pool = mysql.createPool({
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

/**
 * Insert data into the diagnosa_pasien table.
 * @param {string} no_rawat - The no_rawat value.
 * @param {string} kd_penyakit - The kd_penyakit value.
 * @returns {Promise<void>}
 */

const insertDiagnosaPasien = (no_rawat, kd_penyakit) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO diagnosa_pasien (no_rawat, kd_penyakit, status, prioritas, status_penyakit)
      VALUES (?, ?, 'Ralan', 0, 'Lama')
    `;
    pool.query(query, [no_rawat, kd_penyakit], (error, results) => {
      if (error) {
        return reject(new Error('Error inserting data: ' + error.message));
      }
      resolve(results);
    });
  });
};

const checkRecordExists = (no_rawat, kd_penyakit) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS count
      FROM diagnosa_pasien
      WHERE no_rawat = ? AND kd_penyakit = ?
    `;
    pool.query(query, [no_rawat, kd_penyakit], (error, results) => {
      if (error) {
        return reject(new Error('Error checking record existence: ' + error.message));
      }
      resolve(results[0].count > 0);
    });
  });
};

module.exports = { checkRecordExists,insertDiagnosaPasien };