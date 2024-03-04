

const db = require('../database/db.js'); // Adjust the path as necessary


function fetchProducts(callback) {
    let sql =
    `
    SELECT *
    FROM product;
    `
    db.query(sql, (err, result) => {
        if (err) {
            return callback(err, null);
          }
          callback(null, result.rows);
      });
    
  }
  

module.exports = { fetchProducts };
