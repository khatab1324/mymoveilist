const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
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

app.post('/getUser', async (req, res) => {
  const { username, password } = req.body;
  try {
    const usernameResult = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT username,password FROM users WHERE username = "${username}"`,
        async (err, results) => {
          if (err) {
            reject({ errorUsername: 'usernameNotFound' });
          } else {
            if (results.length === 0)
              reject({ errorUsername: 'usernameNotFound' });
            else if (!(await bcrypt.compare(password, results[0].password))) {
              reject({ errorPassword: 'wrong password' });
            } else {
              resolve(results);
            }
          }
        }
      );
    });
    const usernameFromDataBase = usernameResult[0].username;
    const sendUser = { usernameFromDataBase };
    res.send(sendUser);
  } catch (error) {
    console.error('Error fetching user:', error.sqlMessage);
    res.status(500).json(error);
  }
});
app.post('/addUser', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = crypto.randomUUID();
  connection.query(
    `insert into users values ("${id}","${username}","${hashedPassword}")`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'internal server error' });
        throw err;
      }
      res.send(results);
      console.log('its work');
    }
  );
});
app.get('/getMovies/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const idResults = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT id FROM users WHERE username = "${username}"`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    const id = idResults[0].id;
    const results = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT title, type, year, poster FROM userMovies WHERE userId = "${id}"`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log('Your movies are selected');
    res.send(results);
  } catch (error) {
    console.error('Error fetching movies:', error.sqlMessage);
    res
      .status(500)
      .json({ error: 'Error fetching movies', sqlMessage: error.sqlMessage });
  }
});

app.post('/addmovie', async (req, res) => {
  try {
    const { username, movieSelectMovie } = req.body;

    const { Title, Year, imdbID, Type, Poster } = movieSelectMovie;
    const idResult = await new Promise((resolve, reject) => {
      connection.query(
        `select id from users where username="${username}"`,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
    const userId = idResult[0].id;
    const checkIfMovieInList = await new Promise((resolve, reject) => {
      connection.query(
        `select movie_id from userMovies where userId="${userId}" and movie_id="${imdbID}"`,
        (err, results) => {
          if (err) reject(err);
          if (results.length > 0) {
            reject({
              errorMovieFound: 'you have added this movie in your list',
            });
          }
          resolve();
        }
      );
    });
    console.log('check', checkIfMovieInList);
    const addingMovieResult = await new Promise((resolve, reject) => {
      connection.query(
        `insert into userMovies values("${imdbID}","${Title}","${Year}","${Type}","${Poster}","null",0,"${userId}")`,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
    console.log('movie adding seccess');
    res.send(addingMovieResult);
  } catch (error) {
    console.error('Error adding movie ', error.sqlMessage);
    res
      .status(500)
      .json({ error: "can't add movie", sqlMessage: error.sqlMessage });
  }
});

app.listen(3100, () => {
  console.log('open on port 3100');
});
