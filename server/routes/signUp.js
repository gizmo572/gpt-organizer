const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.createUser, (req, res) => {
    console.log("NO, NOT THERE U DUM!!! WE'RE IN heeeerrrrreeeeee!!!!!!");
    return res.status(200).json(res.locals.newUser);
})