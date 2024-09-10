    const mysql = require('mysql2');

    // Función para crear la conexión a la base de datos
    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'cst_americano_db',
    });

    // Conectar a la base de datos
    const connectToDatabase = () => {
    db.connect((err) => {
        if (err) {
        console.error('Error al conectar a la base de datos:', err);
        } else {
        console.log('Conectado a la base de datos MySQL');
        }
    });
    };

    module.exports = {
    db,
    connectToDatabase,
    };
