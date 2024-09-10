const express = require('express');
const { db, connectToDatabase } = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Llamamos a la función para conectarnos a la base de datos
connectToDatabase();

// Ruta para validar el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta para verificar si el usuario y la contraseña coinciden
  const query = 'SELECT * FROM registered_users WHERE TRIM(user_name) = ? AND TRIM(user_password) = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      res.status(500).json({ error: 'Error en la base de datos' });
    } else if (results.length > 0) {
      console.log('Usuario encontrado:', results);
      res.status(200).json({ message: 'Login exitoso' });
    } else {
      console.log('No se encontró el usuario');
      res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
  });
});

// Escuchando en el puerto
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
