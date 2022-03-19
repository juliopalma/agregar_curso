const { ingresar_curso, consultar, actualizar, eliminar_curso } = require('./db');

//const axios = require('axios');
const nunjucks = require('nunjucks');
const express = require('express');
const bp = require('body-parser');
const app = express();
app.use(express.static('static'));
//const uuid = require('uuid');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
//const pg = require('pg');

app.post('/curso', async(req, res) => {
    await ingresar_curso(req.body.nombre, req.body.nivelTecnico, req.body.fechaInicio, req.body.duracion);
    res.json({ Todo: 'ok' })
});

app.get('/cursos', async(req, res) => {
    let todo_cursos;
    try {
        todo_cursos = await consultar();
    } catch (error) {
        console.log("Error al realizar la consulta es: get cursos " + error);
        return res.send(error);
    }
    res.json(todo_cursos);
});

app.put('/curso', async(req, res) => {

    console.log(req.body.fechaInicio);
    console.log(typeof(req.body.fechaInicio));
    console.log(req.body);

    await actualizar(req.body.id, req.body.nombre, req.body.nivelTecnico, req.body.fechaInicio, req.body.duracion);
    res.json({ Todo: 'ok' })
});

app.delete('/curso/:id', async(req, res) => {
    try {
        await eliminar_curso(parseInt(req.params.id));
        res.send('curso eliminado de forma satisfactoria');
    } catch (error) {
        console.log("El error producido es el siguiente: delete curso " + error);
    }
});

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(3011, () => console.log("Ejecutando en el puerto 3011"));