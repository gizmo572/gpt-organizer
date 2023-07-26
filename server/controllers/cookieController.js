const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    const randNum = Math.floor(Math.random() * 100);
    res.cookie('secret', String(randNum));
    return next();
}

// cookieController.setSSIDCookie = async (req, res, next) => {
//     try {

//     }

// }

// cookieController.setJWT = (req, res, next) => {
//     const {username, password} = req.body;

//     const accessToken = jwt.sign({username}, process.env.JWT_SECRET)
// }