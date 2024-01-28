const sql = require('./connect');

module.exports = {

    getAll: (table, filter) => {

        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${table} `;
            if (filter.col != "undefined"){
                query += ` ORDER BY ${filter.col}`
            }
            if (filter.order != "undefined"){
                query += ` ${filter.order}`
            }
            sql.query(query, (err, result) => {
                if (err){
                    console.log(`Error in getting from ${table}: ${err}`);
                    reject(err);
                } else {
                    console.log(`Get success for ${table} table`);
                    resolve(result);
                }
            });

        })
    },

    
}