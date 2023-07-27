const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// router.post('/', userController.verifyUser, cookieController.setJWT, () => {
//     return res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// })

//have a post request fo
router.get('/verifyJwt', cookieController.verifyJWT, (req, res) => {
    console.log('WERE IN HERE!!!');
    return res.status(200).json(res.locals.user);
})

//user makes different post request when no jwt exists
router.post('/noJwt', userController.verifyUser, cookieController.setJWT, (req, res) => {
    console.log('yoyoyoyoyo');
    return res.status(200).json(res.locals.secret);
})

router.delete('/', userController.deleteUser, (req, res) => {
    return res.status(200).json(res.locals.deletedUser);
})

module.exports = router;