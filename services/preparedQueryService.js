const mysql = require('mysql');
const dbConfig = require('./connection');
const pool = mysql.createPool(dbConfig.mysqlServer);



module.exports = {

    Query: function (queryString, valuesToEscape) {
        return new Promise((resolve, reject) => {
			console.log(queryString, valuesToEscape)
            pool.query(queryString, valuesToEscape, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    },
}
