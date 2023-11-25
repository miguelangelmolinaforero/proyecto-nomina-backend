const { Connection, Request } = require('tedious');
const express = require('express');

const app = express();

const config = {
    authentication: {
        type: 'default',
        options: {
            userName: 'ejemplo', // Reemplaza con tu nombre de usuario
            password: 'root' // Reemplaza con tu contraseña
        }
    },
    server: 'DESKTOP-PQEV5G9', // Reemplazar con tu nombre de pc
    options: {
        port: 1433,
        database: 'nomina',
        encrypt: false
    }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        console.error('Error al conectar:', err);
    }else {
        console.log('Conexión establecida con éxito');
        // Aquí se inicia el servidor Express después de establecer la conexión
        app.listen(3000, () => {
            console.log('Servidor Express escuchando en el puerto 3000');
        });
    }
});


/**
 * Api devengosTotalesPorEmpleado
 */
app.get('/devengosTotalesPorEmpleado', (req, res) => {
    darDevengosTotalesPorEmpleado(res);
});

/**
 * Devengos por empleado
 * @param {*} response 
 */
function darDevengosTotalesPorEmpleado(response) {
    const result = []; // Array para almacenar los objetos de cada fila

    const request = new Request('EXEC DevengosTotalesPorEmpleado', (err, rowCount) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            response?.status(500).send('Error al ejecutar la consulta');
        } else {
            console.log(`Consulta exitosa. Filas afectadas: ${rowCount}`);
            response?.status(200).json(result); // Enviar el array como respuesta en formato JSON
        }
    });

    request.on('row', (columns) => {
        const rowObject = {}; // Objeto para almacenar los datos de cada fila
        columns.forEach((column) => {
            rowObject[column.metadata.colName] = column.value; // Agregar valor al objeto usando el nombre de la columna como clave
        });
        result.push(rowObject); // Agregar el objeto al array de resultados
    });

    request.on('done', (rowCount) => {
        console.log('Todas las filas han sido recibidas.');
    });

    connection.execSql(request);
}


/**
 * Api descuentosTotalesPorEmpleado
 */
app.get('/descuentosTotalesPorEmpleado', (req, res) => {
    darDescuentosTotalesPorEmpleado(res);
});

/**
 * Descuentos por empleado
 * @param {*} response 
 */
function darDescuentosTotalesPorEmpleado(response) {
    const result = []; // Array para almacenar los objetos de cada fila

    const request = new Request('EXEC DescuentosTotalesPorEmpleado', (err, rowCount) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            response?.status(500).send('Error al ejecutar la consulta');
        } else {
            console.log(`Consulta exitosa. Filas afectadas: ${rowCount}`);
            response?.status(200).json(result); // Enviar el array como respuesta en formato JSON
        }
    });

    request.on('row', (columns) => {
        const rowObject = {}; // Objeto para almacenar los datos de cada fila
        columns.forEach((column) => {
            rowObject[column.metadata.colName] = column.value; // Agregar valor al objeto usando el nombre de la columna como clave
        });
        result.push(rowObject); // Agregar el objeto al array de resultados
    });

    request.on('done', (rowCount) => {
        console.log('Todas las filas han sido recibidas.');
    });

    connection.execSql(request);
}



/**
 * Api informacionCompletaEmpleados
 */
app.get('/informacionCompletaEmpleados', (req, res) => {
    obtenerInformacionCompletaEmpleados(res);
});

/**
 * Información completa de empleados
 * @param {*} response 
 */
function obtenerInformacionCompletaEmpleados(response) {
    const result = []; // Array para almacenar los objetos de cada fila

    const request = new Request('EXEC InformacionCompletaEmpleados', (err, rowCount) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            response?.status(500).send('Error al ejecutar la consulta');
        } else {
            console.log(`Consulta exitosa. Filas afectadas: ${rowCount}`);
            response?.status(200).json(result); // Enviar el array como respuesta en formato JSON
        }
    });

    request.on('row', (columns) => {
        const rowObject = {}; // Objeto para almacenar los datos de cada fila
        columns.forEach((column) => {
            rowObject[column.metadata.colName] = column.value; // Agregar valor al objeto usando el nombre de la columna como clave
        });
        result.push(rowObject); // Agregar el objeto al array de resultados
    });

    request.on('done', (rowCount) => {
        console.log('Todas las filas han sido recibidas.');
    });

    connection.execSql(request);
}


connection.connect();