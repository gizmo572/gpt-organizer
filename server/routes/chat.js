const express = require('express');


const router = express.Router();
const chatController = require('../controllers/chatController');



router.post('/', chatController.fetchGptResponse, (req, res) => {
    console.log('fetchfetchfetch');
    return res.status(200).json(res.locals.messages)

})




module.exports = router;