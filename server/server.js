const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const mongoURI = 'mongodb://localhost/gpt_organizer_dev';

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

const usersRouter = require('./routes/users');
const signUpRouter = require('./routes/signUp');



app.use(express.json());


app.use(express.static(path.resolve(__dirname, '../build')));



app.use('/log-in', usersRouter);

app.use('sign-up', signUpRouter);


app.use((req, res) => {
    res.sendStatus(404);
})


app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
    console.log('hmmmm')
	const errorObj = Object.assign(defaultErr, err);
	console.log('err', errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT);

module.exports = app;