const { PrismaClient, Prisma } = require('@prisma/client');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const Response = require('./domain/response');
const prisma = new PrismaClient();
const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};
app.use(
  cors({
    origin: 'http://localhost:4200', // Replace with your allowed origin
    credentials: true, // Set to true if the API sends cookies
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/getuser', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await prisma.users.findMany({
      where: { username },
    });
    if (user.length === 0) {
      res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
          usernameError: 'username not found',
        })
      );
    } else if (!(await bcrypt.compare(password, user[0].password))) {
      res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
          passwordError: 'password wrong',
        })
      );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'you are sign in'
          )
        );
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json(error);
  }
});

//

app.post('/adduser', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = crypto.randomUUID();
  try {
    const newUser = await prisma.users.create({
      data: {
        id,
        username,
        password: hashedPassword,
      },
    });
    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'user added', {
        username,
      })
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              'username is already exist'
            )
          );
      }
    }
  }
});

//

app.get('/getMovies/:username', async (req, res) => {
  const username = req.params.username;
  console.log(username);
  try {
    const { id } = await prisma.users.findUnique({ where: { username } });
    const results = await prisma.userMovies.findMany({ where: { userId: id } });
    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `${username} movies are selected`,
          results
        )
      );
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ errorMessage: 'Error fetching movies', error });
  }
});

//

app.post('/addmovie', async (req, res) => {
  try {
    let { username, movieSelectMovie } = req.body;
    const { Title, Year, imdbID, Type, Poster } = movieSelectMovie;
    const { id } = await prisma.users.findUnique({ where: { username } });
    const checkIfMovieInList = await prisma.userMovies.findMany({
      where: {
        AND: [
          { userId: id }, // Use the provided 'id' variable
          { movie_id: imdbID },
        ],
      },
    });
    console.log('check', checkIfMovieInList);
    if (checkIfMovieInList.length === 0) {
      const addingMovieResult = await prisma.userMovies.create({
        data: {
          movie_id: `${imdbID}`,
          title: `${Title}`,
          year: `${Year}`,
          type: `${Type}`,
          poster: `${Poster}`,
          userId: `${id}`,
        },
      });
      console.log('movie adding seccess');
      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            'movie added to the user list',
            addingMovieResult
          )
        );
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(
          new Response(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            'you add this movie to your list'
          )
        );
    }
  } catch (error) {
    console.error('Error adding movie ', error);
    res.status(500).json({ errorMessage: "can't add movie", error });
  }
});

app.listen(3100, () => {
  console.log('open on port 3100');
});
