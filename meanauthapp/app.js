const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to MongoDB database
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

// on connection
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// web equest handler
const app = express();

const users = require('./routes/users');

// port number
const port = 3000;

// Cross-site Open Request Service middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middkeware
app.use(bodyParser.json());

app.use('/users', users);

// index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
} );