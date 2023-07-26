const User = require('../models/userModel');

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