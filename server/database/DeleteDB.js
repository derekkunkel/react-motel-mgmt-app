const sql = require('./connect');

module.exports = {

    /**
     * @param {int} id: 'type_id' from roomtype table
     * @param {string} table: table name to do delete from
     */
    deleteById: (table, id) => 
    {
        return new Promise((resolve, reject) => {
        let query;
        if (table == "reservation")
        {
            query = `DELETE FROM ${table} WHERE reservation_id=('${id}') `
            sql.query(query, (err,result) => 
            {
            if (err){
                console.log(`Deleting reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful deletion in reservation table`);
                resolve(result);
                }
            });
        }

        else if (table == "rooms") 
        {
            query = `DELETE FROM ${table} WHERE room_id=('${id}') `
            sql.query(query, (err,result) => 
            {
            if (err){
                console.log(`Deleting rooms Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful deletion in rooms table`);
                resolve(result);
                }
            });

            // roomType associated with rooms should be deleted along it as well
        }
    })
        
    },
















}