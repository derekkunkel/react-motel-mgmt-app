const sql = require('./connect');

module.exports = {

    deleteGuestById: (table, id) => {

        return new Promise((resolve, reject) => {
            let deletesql = `DELETE FROM ${table} WHERE guest_id=('${id}')`
            sql.query(deletesql, (err, result) => {
                if (err){
                    console.log(`delete ${table} error: ${err}`);
                    reject(err);
                } else {
                    console.log(`successful ${table} deletion`);
                    resolve(result);
                }
            });

        })


    }
    
   
    
}
