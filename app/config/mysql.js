const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'18.217.14.101',
    user:'awa_user',
    password: 'Abc12345',
    database: 'awa'
});

conn.connect(err => {
    if (err) console.log("Problema en conexion al MySQL");
    else console.log('MySQL operando...');
});

module.exports = conn;