const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password })
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

userController.getUser = async (req, res, next) => {
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