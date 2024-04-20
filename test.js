const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'keanu_reborn1'
});

if (conn) {
    console.log('Konek kedatabase');
};

const app = express();

const arrEmpty = [];
const idMessage = [];

app.listen(3001, () => {
    console.log('Server running on port 3001!');

    let querySender = `SELECT * FROM message_user WHERE sender_message = ? AND receiver_message = ? ORDER BY id_message ASC`;

    conn.query(querySender, ['2', '1'], (err, results) => {
        if (err) {
            console.log('Gagal query');
            return;
        }


        results.forEach(result => {

            arrEmpty.push(result);

        })

    })

    console.log('seperator');

    let queryReceiver = `SELECT * FROM message_user WHERE sender_message = ? AND receiver_message = ? ORDER BY id_message ASC`;

    conn.query(queryReceiver, ['1', '2'], (err, results) => {
        if (err) {
            console.log('Gagal query');
            return;
        }


        results.forEach(result => {

            arrEmpty.push(result);

        })

        arrEmpty.forEach(ar => {
            idMessage.push(ar.id_message);
        })

        console.log(idMessage);

        idMessage.sort();

        console.log(idMessage);
        console.log(arrEmpty);

    })



});


