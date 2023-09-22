const User = require('../models/userModel');
const bcrypt = require('bcryptjs')

const userController = {};

userController.createUser = async (req, res, next) => {
    const { username, password, categories } = req.body;
    try {
        const newUser = await User.create({ username, password, categories })
        console.log('AHOY!!', newUser)
        res.locals.newUser = newUser;
        return next();
    } catch (err) {
        return next({
            log: 'Express error handler caught unknown middleware error in userController.createUser',
            status: 400,
            message: { err: 'An error occurred in userController.createUser' },
        });
    }
}

userController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body, 'req.body', password)
    try {
        const user = await User.findOne({username})
        if (user === null) return res.status(200).json({});
        console.log(user.password, 'zzzzz', typeof password)
        try {
            const match = await bcrypt.compare(password, user.password);
            res.locals.user = user;
            console.log('match', match)
            return match ? next() : next({
                log: `Express error in userController.verifyUser: invalid password`,
                status: 400,
                message: { err: `An error occurred in userController.verifyUser: invalid password` },
            })
        } catch (err) {
            console.log(err)
            next({
                log: "Express error in userController.verifyUser",
                status: 400,
                message: { err: 'An error occurred in userController.verifyUser' },
            })
        }


    } catch (err) {
        next({
            log: "Express error in userController.verifyUser",
            status: 400,
            message: { err: 'An error occurred in userController.verifyUser' },
        })
    }
}

userController.getUser = async (req, res, next) => {
    console.log('a', req.body)
    const {username} = req.body;
    try {
        const user = await User.findOne({username});
        console.log('user', user)
        if (user === null) return next({
                log: "Express error in userController.getUser: user doesn't exist",
                status: 400,
                message: { err: 'An error occurred in userController.getUser: user does not exist' },
            })

        res.locals.user = user;
        return next();
    } catch (err) {
        return next({
            log: err + 'Express error handler caught unknown middleware error in userController.getUser',
            status: 400,
            message: { err: 'An error occurred in userController.getUser' },
        });
    }
}

userController.deleteUser = async (req, res, next) => {
    const {username} = req.body;
    try {
        const { _id } = await User.findOne({username});
        const user = await User.deleteOne({_id})
        if (!user) return next({
                log: "Express error in userController.deleteUser: user doesn't exist",
                status: 400,
                message: { err: 'An error occurred in userController.deleteUser: user does not exist' },
            })

        res.locals.deletedUser = user;
        next();
    } catch (err) {
        return next(err);
    }
}

module.exports = userController;