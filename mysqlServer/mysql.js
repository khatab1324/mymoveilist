const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const { json } = require('body-parser');
const bodyParser = require('body-parser');
const { log } = require('console');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'adminMovieList',
  password: 'Pass_1122',
  database: 'mymovielist',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});
app.use(
  cors({
    origin: 'http://localhost:4200', // Replace with your allowed origin
    credentials: true, // Set to true if the API sends cookies
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/getData', (req, res) => {
  connection.query('select * from users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.post('/addUser', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  connection.query(
    `insert into users values ("id5","${username}","${password}")`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'internal server error' });
        throw err;
      }
      console.log('its work');
    }
  );
});

app.listen(3100, () => {
  console.log('open on port 3100');
});
