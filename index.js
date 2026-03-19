const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors())

// conexión BD (usa PlanetScale o Clever Cloud)

const db = mysql.createConnection({
  host: "b7wmgfnurdc1jsxtzhbc-mysql.services.clever-cloud.com",
  user: "u1md4gr8fhtl8lym",
  password: "mMRUIbIpxXKwPQU1XoUb",
  database: "b7wmgfnurdc1jsxtzhbc",
  port: 3306
});

// GET unidades
app.get('/api/unidades', (req, res) => {
  db.query('SELECT * FROM unidades', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST unidades
app.post('/api/unidades', (req, res) => {
  const { nombre } = req.body;
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  db.query('INSERT INTO unidades (nombre) VALUES (?)',
    [nombre],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Guardado" });
    }
  );
});

module.exports = app;

//app.listen(3000, () => console.log("Servidor listo"));