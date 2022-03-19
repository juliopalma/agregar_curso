const { Pool } = require('pg');

//Se crea la conexion a base de datos
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'cursos',
    password: '1234',
    port: 5432,
    max: 8,
    min: 2,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

async function ingresar_curso(nombre, nivelTecnico, fechaInicio, duracion) {
    let client
    client = await pool.connect();

    let result = await client.query({
        text: `insert into cursos (nombre, nivel, fecha, duracion) values($1, $2, $3, $4)`,
        values: [nombre, nivelTecnico, fechaInicio, duracion]
    });

    client.release();
    return result.rows;
}

async function consultar() {
    let client
    client = await pool.connect();

    let result = await client.query({ text: `select * from cursos` });
    client.release();
    return result.rows;
};

async function actualizar(nombre, nivelTecnico, fechaInicio, duracion) {
    let client
    client = await pool.connect();


    const nt = parseInt(nivelTecnico);
    const dr = parseInt(duracion);

    let res = await client.query({
        text: `update cursos set nivel=$2, fecha=$3, duracion=$4 where nombre = $1`,
        values: [nombre, nt, fechaInicio, dr]
    });
    client.release();
};

async function eliminar_curso(id_usuario) {


    let client
    client = await pool.connect();

    let res = await client.query({ text: `delete from cursos where id = $1`, values: [id_usuario] });

    client.release();
    return res.rows;
};







/* async function consultar() {
    let client
    client = await pool.connect();
    let res = await client.query({ text: `select * from usuarios` });
    client.release();
    return res.rows;
};

async function insertar_usuario(nombre, balance) {
    let client
    client = await pool.connect();

    let res = await client.query({
        text: `insert into usuarios (nombre, balance) values($1, $2)`,
        values: [nombre, parseInt(balance)]
    });

    client.release();
    return res.rows;
};

async function transferencias() {
    let client
    client = await pool.connect();

    let res = await client.query({
        text: `select transferencias.id, emisor.nombre, receptor.nombre as nombre1, transferencias.monto, transferencias.fecha
                from transferencias join usuarios as emisor on transferencias.emisor = emisor.id 
                join usuarios as receptor on transferencias.receptor = receptor.id`,
        rowMode: "array"
    });


    console.log(res.rows);
    client.release();
    return res.rows;
};

async function realizar_transferencia(nombre_emisor, nombre_receptor, monto) {

    const client = await pool.connect();
    let { rows } = await client.query({
        text: 'select * from usuarios where nombre=$1',
        values: [nombre_emisor]
    });
    const emisor = rows[0];

    const result = await client.query({
        text: 'select * from usuarios where nombre=$1',
        values: [nombre_receptor]
    });
    const receptor = result.rows[0];

    const monto_usuario = parseInt(monto);

    if (emisor.balance < monto_usuario) {
        throw "No tiene saldo suficiente para realizar la transferencia";
    }

    const resultado1 = emisor.balance - monto_usuario;
    await client.query({
        text: 'update usuarios set balance=$1 where id=$2',
        values: [resultado1, emisor.id]
    });

    const resultado2 = receptor.balance + monto_usuario;
    await client.query({
        text: 'update usuarios set balance=$1 where id=$2',
        values: [resultado2, receptor.id]
    });

    await client.query({
        text: "insert into transferencias (emisor, receptor, monto) values ($1, $2, $3)",
        values: [emisor.id, receptor.id, monto_usuario]
    });

    client.release();
    return result.rows;
}

async function eliminar_usuario(id_usuario) {
    let client
    client = await pool.connect();
    let res = await client.query({ text: `delete from usuarios where id = $1`, values: [id_usuario] });
    return res.rows;
};

async function actualizar(nombre_usuario, balance_usuario, id_usuario) {
    let client
    client = await pool.connect();

    let res = await client.query({ text: `update usuarios set nombre = $1, balance = $2 where id = $3`, values: [nombre_usuario, balance_usuario, id_usuario] })

    client.release();
    return res.rows;
};

async function eliminar_curso(id_curso) {
    let client
    client = await pool.connect();

    let res = await client.query({ text: `delete from cursos where id = $1`, values: [id_usuario] });
    return res.rows;
}; */

module.exports = { ingresar_curso, consultar, actualizar, eliminar_curso }