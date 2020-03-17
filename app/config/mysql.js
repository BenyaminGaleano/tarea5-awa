const mysql = require('mysql');
/* const conn = mysql.createConnection({
    host:'18.217.14.101',
    user:'awa_user',
    password: 'Abc12345',
    database: 'awa'
}); */
const conn = mysql.createConnection({
    host:'localhost',
    user:'phpmyadmin',
    password: 'galeano4014',
    database: 'AWA'
});

conn.connect(err => {
    if (err) console.log("Problema en conexion al MySQL");
    else console.log('MySQL operando...');
});

module.exports = conn;