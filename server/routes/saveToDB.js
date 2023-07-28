const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');


router.post('/', chatController.saveConvo, (req, res) => {

    return res.status(200).json(res.locals.updatedUser);
})

module.exports = router;