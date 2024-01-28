'use strict';

const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');

const db = require('./database/utility.js');
const get = require('./database/getDB.js')
const deleteDB = require('./database/delete.js')
const updateDB = require('./database/UpdateDB.js');
const mngrDeletion = require('./database/DeleteDB.js');


const PORT = 3030;
const app = express();
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("Server is up and running");
});

app.post('/api/guest', async (req, res) => {

    try {

    await db.customQuery(`INSERT INTO guest (first_name, last_name, address, number, birthday, license_number, email) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.address}', '${req.body.pnumber}','${req.body.dob}', '${req.body.license}', '${req.body.email}')`);

    } catch (err){
        console.log(err)
        res.sendStatus(401);
    }
});

app.get('/api/reservations', async (req,res) => {
    try {
        let roomid = "0";
        let id = "0"
        if ((req.query.fname !== undefined) && (req.query.lname !== undefined)){
            const result2 = await db.customQuery(`SELECT * FROM guest WHERE (guest.first_name = '${req.query.fname}' AND guest.last_name = '${req.query.lname}')`);
            console.log(result2)
            id = result2[0].guest_id;
        } 
        if (req.query.id !== undefined){
            id = req.query.id;
        } 
        if (id === undefined){
            let response = await get.getAll("reservation", filter);
            res.send(response);
            return;
        }
        const result = await db.customQuery(`SELECT * FROM rooms INNER JOIN reservation ON reservation.room_id = rooms.id INNER JOIN roomtype ON roomtype.type_id = rooms.type_id WHERE reservation.guest_id = '${id}'`);
        res.send(result);

    } catch (err){
        console.log(err)
        res.sendStatus(401);

    }
});


app.get('/api/searchGuest', async (req, res) => {

    try {

        const data = await db.customQuery(`SELECT * FROM guest WHERE last_name LIKE '%${req.query.lname}%'`);
        res.send(data)

    } catch (err) {
        console.log(err)
        res.sendStatus(401);
    }
})

app.get('/api/free_rooms', async (req,res) => {
    try {
        const result = await db.customQuery(`SELECT * FROM rooms WHERE id NOT IN (SELECT room_id FROM reservation WHERE DATE(start_date) <= '${req.query.end_date}' AND DATE(end_date) >= '${req.query.start_date}')`);
        res.send(result);

    } catch (err){
        console.log(err)
        res.sendStatus(404);

    }
});

app.get('/api/getRooms', async (req, res) => {

    try {

        const data = await db.customQuery(`SELECT * FROM rooms`);
        res.send(data)

    } catch (err) {
        console.log(err)
        res.sendStatus(401);
    }
})

app.get('/api/getRoomPrice', async (req,res) => {
    try {
        const price = await db.customQuery(`SELECT price FROM rooms WHERE id=${req.query.room_id}`)
        res.send(price);

    } catch (err){
        console.log(err)
        res.sendStatus(404);

    }
});

app.get('/api/getGuestIdByEmail', async (req,res) => {
    try {
        const guest_id = await db.customQuery(`SELECT guest_id FROM guest WHERE email='${req.query.email}'`)
        res.send(guest_id);

    } catch (err){
        console.log(err)
        res.sendStatus();

    }
});

app.post('/api/reserve', async (req, res) => {

    try {
        const resVar = await db.customQuery(`INSERT INTO reservation (guest_id, room_id, price, start_date, end_date) VALUES ('${req.body.guest_id}', '${req.body.room_id}', ${req.body.price}, '${req.body.start_date}','${req.body.end_date}')`);
        console.log(resVar)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});

app.post('/api/selfReserve', async (req, res) => {

    try {
        const resVar = await db.customQuery(`INSERT INTO reservation (guest_id, room_id, price, start_date, end_date) VALUES ('${req.query.guest_id}', '${req.query.room_id}', ${req.query.price}, '${req.body.start_date}','${req.body.end_date}')`);
        console.log(resVar)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});


app.delete('/api/deleteReservation', async (req, res) => {

    try {

        await db.customQuery(`DELETE FROM reservation WHERE reservation_id = ('${req.body.reservation_id}')`);

    } catch (err) {
        console.log(err)
        res.sendStatus(401);
    }
})

app.post('/api/rooms', async (req, res) => {

    try {

    await db.customQuery(`INSERT INTO rooms (beds, price, type_id, max_guest) VALUES ('${req.body.beds}', '${req.body.price}', '${req.body.type_id}','${req.body.max_guest}')`);

    } catch (err){
        console.log(err)
        res.sendStatus(401);
    }
    
});

app.put('/api/updateRoomType', (req,res) => {
    try {
        let type_id = req.body.type_id;
        let columnName = req.body.columnName;
        let updateVal = req.body.updateVal;

        updateDB.updateRoomType(type_id, columnName, updateVal);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('/api/updateRooms', (req,res) => {
    try {
        let room_id = req.body.room_id;
        let columnName = req.body.columnName;
        let updateVal = req.body.updateVal;

        updateDB.updateRooms(room_id, columnName, updateVal);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('api/updateReservation', (req,res) => {
    try {
        let res_id = req.body.res_id;
        let columnName = req.body.columnName;
        let updateVal = req.body.updateVal;

        updateDB.updateReservation(room_id, columnName, updateVal);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.delete('api/MngrDelete/:table/:id', (req,res) => {
    try {
        mngrDeletion.deleteById(req.params.table, req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});


// there may be a simpler way to update using Ralph's utility.js' customQuery.
app.put('/api/updateRoomType/:id', (req,res) => {
    try{
        db.customQuery(`UPDATE roomtype SET type='${req.body.type}', smoking='${req.body.smoking}', kitchenette='${req.body.kitchenette}' WHERE type_id='${req.params.id}' `)
    }catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('/api/updateRooms/:id', (req,res) => {
    try{
        db.customQuery(`UPDATE rooms SET beds='${req.body.beds}', price='${req.body.price}', type_id='${req.body.type_id}', max_guest='${req.body.max_guest}' WHERE id='${req.params.id}' `)
    }catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('/api/updateReservation/:id', (req,res) => {
    try{
        db.customQuery(`UPDATE reservation SET guest_id='${req.body.guest_id}', room_id='${req.body.room_id}', price='${req.body.price}', start_date='${req.body.start_date}', end_date='${req.body.end_date}' WHERE reservation_id='${req.params.id}' `)
    }catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.delete('/api/DeleteRoom/:id', (req,res) => {
    try{
        db.customQuery(`DELETE FROM rooms WHERE id='${req.params.id}' `);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
})

app.get('/api/rooms/:id', async (req, res) => {

    try {

        const data = await db.customQuery(`SELECT * FROM rooms WHERE id=${req.params.id}`);
        res.send(data)

    } catch (err) {
        console.log(err)
        res.sendStatus(401);
    }
});

app.put('/api/guest/:id', (req, res) => {
    try {
        db.customQuery(`UPDATE guest SET first_name='${req.body.fname}', last_name='${req.body.lname}',address='${req.body.address}', number='${req.body.pnumber}',birthday='${req.body.dob}',license_number='${req.body.license}',email='${req.body.email}' WHERE guest_id='${req.params.id}'`);
        } catch (err){
            console.log(err)
            res.sendStatus(500);
        }


});

app.get('/api/empsched', async (req,res) => {
    try {
        const result = await db.customQuery(`SELECT * FROM employees INNER JOIN schedule ON employees.id = schedule.id WHERE DATE(start) = '${req.query.start}'`);
        res.send(result);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.post('/api/schedule', (req,res) => {
    try {
        db.customQuery(`INSERT INTO schedule (id, start, end) VALUES ('${req.body.id}', '${req.body.start}', '${req.body.end}')`);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('/api/UpdateSched/:id', (req,res) => {
    try {
        db.customQuery(`UPDATE schedule SET start='${req.body.start}', end='${req.body.end}'`);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.delete('/api/DeleteSchedule', async (req,res) => {
    try {
        db.customQuery(`DELETE FROM schedule WHERE sched_id='${req.query.id}'`);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});


app.get('/api/:table', async (req,res) => {
    const filter = {col:`${req.query.column}`, order:`${req.query.orderby}`};
    try {
        const result = await get.getAll(req.params.table, filter);
        res.send(result);

    } catch(err){
        res.sendStatus(404)
    }

});

//EMPLOYEE STUFF
app.put('/api/updateEmployee', (req,res) => {
    try {
        let id = req.body.id;
        let columnName = req.body.columnName;
        let updateVal = req.body.updateVal;

        updateDB.updateEmployee(id, columnName, updateVal);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.put('/api/updateEmployee/:id', (req,res) => {
    try{
        db.customQuery(`UPDATE employees SET first_name='${req.body.first_name}', last_name='${req.body.last_name}', wage='${req.body.wage}', email='${req.body.email}',permission='${req.body.permission}' WHERE id='${req.params.id}' `)
    }catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.post('/api/employees', async (req, res) => {

    try {

    await db.customQuery(`INSERT INTO employees (id, first_name, last_name, wage, email, permission) VALUES ('${req.body.id}', '${req.body.first_name}', '${req.body.last_name}','${req.body.wage}','${req.body.email}','${req.body.permission}')`);
    res.sendStatus(200);
    } catch (err){
        console.log(err)
        res.sendStatus(401);
    }
    
});

app.delete('/api/DeleteEmployee/:id', (req,res) => {
    try{
        db.customQuery(`DELETE FROM employees WHERE id='${req.params.id}' `);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
})


app.delete('/api/:table/:id', (req,res) => {
    try {
        deleteDB.deleteGuestById(req.params.table,req.params.id);
    } catch (err){
        res.sendStatus(500);
    }
    

});

app.listen(PORT, HOST);
console.log(`Express running on port ${PORT}`);
