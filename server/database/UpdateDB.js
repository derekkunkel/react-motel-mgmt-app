const sql = require('./connect');


module.exports = {

    /**
     * @param {int} id: 'type_id' from roomtype table
     * @param {String} ColumnName: Column name to change value from
     * @param {String} UpdateVal: Value to change from Column name 
     */
     updateRoomType: (type_id, ColumnName, UpdateVal) => 
     {
        return new Promise((resolve, reject) => {
    
            if (ColumnName == "type") 
            {
            let query;
            query = `UPDATE roomtype SET type = ${UpdateVal} WHERE type_id = ${type_id} `
            sql.query(query, (err, result) => {
                if (err){
                    console.log(`Updating Room Type Error: ${err}`);
                    reject(err);
                } else {
                    console.log(`Successful Changes in the roomtype table`);
                    resolve(result);
                }
            });

            }
            else if (ColumnName == "smoking") 
            {
            let query;
            query = `UPDATE roomtype SET smoking = ${UpdateVal} WHERE type_id = ${type_id} `
            sql.query(query, (err, result) => {
                if (err){
                    console.log(`Updating Room Type Error: ${err}`);
                    reject(err);
                } else {
                    console.log(`Successful Changes in the roomtype table`);
                    resolve(result);
                }
            });

            }
            else if (ColumnName == "kitchenette")
            {
            let query;
            query = `UPDATE roomtype SET kitchenette = ${UpdateVal} WHERE type_id = ${type_id} `
            sql.query(query, (err, result) => {
                if (err){
                    console.log(`Updating Room Type Error: ${err}`);
                    reject(err);
                } else {
                    console.log(`Successful Changes in the roomtype table`);
                    resolve(result);
                }
            });

            }
        })
    },

    /**
     * @param {int} id: 'room_id' from rooms table
     * @param {String} ColumnName: Column name to change value from
     * @param {String} UpdateVal: Value to change from Column name 
     */
    updateRooms: (room_id, ColumnName, UpdateVal) =>
    {
        return new Promise((resolve, reject) => {
        if (ColumnName == "beds") 
        {
        let query;
        query = `UPDATE rooms SET beds = ${UpdateVal} WHERE room_id = ${room_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Rooms Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'beds' of rooms table `);
                resolve(result);
            }
            });
        }
        else if (ColumnName == "price") 
        {
        let query;
        query = `UPDATE rooms SET price = ${UpdateVal} WHERE room_id = ${room_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Rooms Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'price' of rooms table `);
                resolve(result);
            }
        });
        }

        else if (ColumnName == "max_guest")
        {
        let query;
        query = `UPDATE rooms SET max_guest = ${UpdateVal} WHERE room_id = ${room_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Rooms Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'price' of rooms table `);
                resolve(result);
            }
        });
        }
        // rooms is associated with type_id of room_type
        // type_id should not be updated/changed
    })
    },


   /**
     * @param {int} id: 'id' from rooms table
     * @param {String} ColumnName: Column name to change value from
     * @param {String} UpdateVal: Value to change from Column name 
     */
    updateEmployee: (id, ColumnName, UpdateVal) =>
    {
        return new Promise((resolve, reject) => {
        if (ColumnName == "first_name") 
        {
        let query;
        query = `UPDATE employees SET first_name = ${UpdateVal} WHERE id = ${id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Employees Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'first_name' of employees table `);
                resolve(result);
            }
            });
        }
        else if (ColumnName == "last_name") 
        {
        let query;
        query = `UPDATE employees SET last_name = ${UpdateVal} WHERE id = ${id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Employees Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'last_name' of employees table `);
                resolve(result);
            }
        });
        }

        else if (ColumnName == "wage")
        {
        let query;
        query = `UPDATE employees SET wage = ${UpdateVal} WHERE emp_d = ${id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Employees Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'wage' of employees table `);
                resolve(result);
            }
        });
        }
        
        else if (ColumnName == "email")
        {
        let query;
        query = `UPDATE employees SET email = ${UpdateVal} WHERE emp_d = ${id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Employees Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'email' of employees table `);
                resolve(result);
            }
        });
        }
   

        else if (ColumnName == "permission")
        {
        let query;
        query = `UPDATE employees SET permission = ${UpdateVal} WHERE emp_d = ${id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Employees Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'permission' of employees table `);
                resolve(result);
            }
        });
        }

    })
    },

    /**
     * @param {int} id: 'res_id' from reservation table
     * @param {String} ColumnName: Column name to change value from
     * @param {String} UpdateVal: Value to change from Column name 
     */
    updateReservation: (res_id, ColumnName, UpdateVal) => 
    {
        return new Promise((resolve, reject) => {
        if (ColumnName == "guest_id") 
        {
        let query;
        query = `UPDATE reservation SET guest_id = ${UpdateVal} WHERE reservation_id = ${res_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'guest_id' of reservation table `);
                resolve(result);
            }
        });
        }

        else if (ColumnName == "room_id")
        {
        let query;
        query = `UPDATE reservation SET room_id = ${UpdateVal} WHERE reservation_id = ${res_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'room_id' of reservation table `);
                resolve(result);
            }
        });
        }

        else if (ColumnName == "price") 
        {
        let query;
        query = `UPDATE reservation SET price = ${UpdateVal} WHERE reservation_id = ${res_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'price' of reservation table `);
                resolve(result);
            }
        });
        }

        else if(ColumnName == "start_date") 
        {
        let query;
        query = `UPDATE reservation SET start_date = ${UpdateVal} WHERE reservation_id = ${res_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'start_date' of reservation table `);
                resolve(result);
            }
        });
        }

        else if(ColumnName == "end_date") 
        {
        let query;
        query = `UPDATE reservation SET end_date = ${UpdateVal} WHERE reservation_id = ${res_id} `
        sql.query(query, (err, result) => {
            if (err){
                console.log(`Updating Reservation Error: ${err}`);
                reject(err);
            } else {
                console.log(`Successful Changes in the 'end_date' of reservation table `);
                resolve(result);
            }
        });
        }
    })
    },

}
