const sql = require('./connect');

module.exports = {

    /**
     * Searches database by character
     * @param {String} table table to search
     * @param {String} col where to search
     * @param {String} target search characters
     * @param {String} order Order by asc/desc
     */
    search: (table, col, target, order) => {
        return new Promise((resolve, reject) => {
            try {
                let query = `SELECT * FROM ${table} WHERE ${col} LIKE '%${target}%' ORDER BY ${col} ${order}`;
                sql.query(query, (err, result)=> {
                    if (err){
                        console.log(`Error in searching for ${target}: ${err}`);
                        reject(err);
                    } else {
                        console.log(`Success in searching ${target}`);
                        resolve(result);
                    }
                })


            } catch(err){
                console.log(err);
                reject(err);

            }

        })

    },

    exists: (table, column, value) => {
        return new Promise((resolve, reject) => {
            try {
                let query = `SELECT * FROM ${table} WHERE ${column}='${value}'`
                sql.query(query, (err, result)=> {
                    if (err){
                        console.log("SQL error in exists function: "+err);
                        reject(false);
                    } else {
                        if (result.length == 0){
                            resolve(false);
                        } else {
                            resolve(true);
                        }
        
                    }
                })
            } catch(err){
                console.log(err);
                reject(err);

            }
        

        })
        
    },


    customQuery: (query) => {
        return new Promise((resolve, reject) => {
            try {
                sql.query(query, (err, result) => {
                    if (err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

            } catch(err){
                console.log(query)
                reject(err);
            }
            

        })

    },
    
}