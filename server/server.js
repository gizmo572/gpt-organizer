const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();

const mongoURI = process.env.DATABASE_URI;

const PORT = 3000;

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
    };
};

dbConnect();

const usersRouter = require('./routes/logIn');
const signUpRouter = require('./routes/signUp');
const chatRouter = require('./routes/chat');
const saveRouter = require('./routes/saveToDB');
const userController = require('./controllers/userController');

app.use(express.json());


app.use(express.static(path.resolve(__dirname, '../build')));


app.use('/log-in', usersRouter);
app.use('/sign-up', signUpRouter);
app.use('/chat', chatRouter);
app.use('/save', saveRouter);
app.get('/log-in/test', userController.getUser, (req, res) => {
    res.status(200).json(res.locals.user);
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.use((req, res) => {
    res.sendStatus(404);
})


app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign(defaultErr, err);
	console.log('err', errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT);

module.exports = app;