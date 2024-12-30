const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const app = express();
const port = process.env.PORT || 3000;


const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});



// Добавление тестовых данных
async function seedMovies() {
  const count = await Movie.count();
  if (count === 0) {
    await Movie.bulkCreate([
      { title: 'Inception', director: 'Christopher Nolan', year: 2010 },
      { title: 'The Matrix', director: 'Wachowskis', year: 1999 },
      { title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
    ]);
  }
}

app.get('/', async (req, res) => {
  try {
    const movie = await Movie.findOne({ where: { title: 'Inception' } });
    if (movie) {
      res.send(`The director of "${movie.title}" is ${movie.director}, released in ${movie.year}.`);
    } else {
      res.send('Movie not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


sequelize.authenticate().then(() => {
  console.log('Database connected...');
  seedBooks().then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
