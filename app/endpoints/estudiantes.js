const conn = require('../config/mysql');
const joi = require('joi');

module.exports = (app)=>{
    /* obtiene todos los estudiantes */
    app.get('/estudiante', (req, res)=>{
       let query =  'SELECT * FROM estudiante;';
       conn.query(query, (err, rows, fields)=>{
            if(err) res.status(500).send('Petición inválida');
            res.send(rows);
       });
       
    });

    app.get('/estudiante/:id', (req, res)=>{
        let query =  `SELECT * FROM estudiante WHERE id = ${req.params.id}`;
        conn.query(query, (err, rows, fields)=>{
            if(err) res.status(500).send(`No fue posible encontrar un estudiante asociado al id "${req.params.id}"`);
            else if(!rows || rows.length === 0) res.status(500).send(`No fue posible encontrar un estudiante asociado al id "${req.params.id}"`);
            else res.send(rows[0]);
        });
     });

     app.post('/estudiante',(req, res)=>{
        let scheme = joi.object({
            nombre: joi.string().required(),
            direccion: joi.string().required(),
            fecha_nacimiento: joi.string().required(),
            saldo: joi.number().required()
        });

        let valid = scheme.validate(req.body);
        if(valid.error){
            res.status(500).send(`No cumple con el esquema. Ejemplo:\n{
                    "nombre": "Josue",
                    "direccion": "Guatemala",
                    "fecha_nacimiento": "06032000",
                    "saldo": 0
                }`);           
            return;
        }
        let query = `INSERT INTO estudiante (nombre, direccion, fecha_nacimiento, saldo) VALUES ('${req.body.nombre}', '${req.body.direccion}', '${req.body.fecha_nacimiento}', ${req.body.saldo});`
        conn.query(query, (error, rows, fields)=>{
            if(error){
                res.status(500).send(`No fue posible agregar a ${req.body.nombre}`);
            } else {
                res.send(`${req.body.nombre} Fue agregado a la Base de datos`);
            }
        })
     });

     app.put('/estudiante/:id', (req, res)=>{
        let scheme = joi.object({
            nombre: joi.string().required(),
            direccion: joi.string().required(),
            fecha_nacimiento: joi.string().required(),
            saldo: joi.number().required()
        });

        let valid = scheme.validate(req.body);
        if(valid.error){
            res.status(500).send(`No cumple con el esquema. Ejemplo:\n{
                    "nombre": "Josue",
                    "direccion": "Guatemala",
                    "fecha_nacimiento": "06032000",
                    "saldo": 0
                }`);           
            return;
        }
        let query = `UPDATE estudiante SET nombre = '${req.body.nombre}', direccion = '${req.body.direccion}',  fecha_nacimiento = '${req.body.fecha_nacimiento}', saldo = ${req.body.saldo} WHERE id = ${req.params.id};`
        conn.query(query, (error, rows, fields)=>{
            if(error){
                res.status(500).send(`No fue posible actualizar a ${req.body.nombre}`);
            } else {
                res.send(`la información de ${req.body.nombre} fue actualizada`);
            }
        })
     })

     app.delete('/estudiante/:id', (req, res)=>{
        let query = `DELETE FROM estudiante WHERE id = ${req.params.id}`;
        conn.query(query, (err, row, col) => {
            if (err) res.status(404).send("No se pudo borrar el estudiante");
            res.send("Estudiante eliminado satisfactoriamente");
        })
     });
}