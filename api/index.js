const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// conexión BD
const db = mysql.createConnection({
  host: "b7wmgfnurdc1jsxtzhbc-mysql.services.clever-cloud.com",
  user: "u1md4gr8fhtl8lym",
  password: "mMRUIbIpxXKwPQU1XoUb",
  database: "b7wmgfnurdc1jsxtzhbc",
  port: 3306
});

// 👇 IMPORTANTE: SIN /api AQUÍ
app.get('/unidades', (req, res) => {
  db.query('SELECT * FROM unidades', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post('/unidades', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre requerido" });
  }

  db.query(
    'INSERT INTO unidades (nombre) VALUES (?)',
    [nombre],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Guardado correctamente" });
    }
  );
});

module.exports = app;