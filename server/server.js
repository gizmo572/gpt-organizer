const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// const usersRouter = require('./routes/users');




app.use(express.json());




app.use(express.static(path.resolve(__dirname, '../build')));



app.listen(PORT);