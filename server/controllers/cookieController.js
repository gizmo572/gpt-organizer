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

cookieController.setJWT = async (req, res, next) => {
    const {_id, username} = res.locals.user;
    const payload = { _id, username }
    console.log('pl', payload)
    const secret = process.env.JWT_SECRET
    console.log('shhhh', secret);
    const authToken = await jwt.sign(payload, secret, {expiresIn: '1h'});
    res.locals.secret = {
        authToken: authToken,
        user: {
            id: _id,
            username: username
        }
    };
    console.log('secret signed!', authToken);
    next();
}

cookieController.verifyJWT = (req, res, next) => {
    console.log('req.headers', req.headers);
    const authorization = req.headers['authorization'];
    if (!authorization) return next({
        log: `Express error in cookieController.verifyJWT: no JWT`,
        status: 401,
        message: { err: `An error occurred in cookieController.verifyJWT: no JWT` },
    })

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(401);
        const { username } = user;
        const { categories } = await User.findOne({ username });
        user['categories'] = categories;
        res.locals.user = user;
        console.log('userrrr', user)
        return next();
    })
}

module.exports = cookieController;