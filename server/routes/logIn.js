const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.verifyUser, () => {
    return res.sendFile(path.resolve(__dirname, '../client/signup.html'));
})

router.get('/', userController.getUser, (req, res) => {
    console.log('WERE IN HERE!!!');
    return res.status(200).json(res.locals.user);
})

router.delete('/', userController.deleteUser, (req, res) => {
    return res.status(200).json(res.locals.deletedUser);
})

module.exports = router;