const axios = require('axios');
const User = require('../models/userModel');


const chatController = {};

chatController.fetchGptResponse = async (req, res, next) => {
    const messages = req.body;  //should be an array of objects
    console.log('messages', messages)
    const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationmpt',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
        messages: messages,
        web_access: false
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.locals.messages = [...messages, {"role": "chatGPT", "content": response.data.MPT}];
        next();
    } catch (error) {
        console.error(error);
    }
}

chatController.saveConvo = async (req, res, next) => {
    const { username } = req.body;
    const category = Object.keys(req.body).filter(key => key !== 'username')[0];
    const title = Object.keys(req.body[category])[0];
    const convos = req.body[category][title];
    console.log(req.body, username, category, title, convos);
    
    try {
        const user = await User.findOne({ username: username })
        console.log('user', user)
        if (user.categories.get(category)) {
            if (user.categories.get(category).get(title)) {

                user.categories.get(category).get(title).push(...convos);

            } else {

                user.categories.get(category).set(title, convos);

            }
        } else {
            console.log('hs;afkfldfj')
            const conversationMap = new Map();
            conversationMap.set(title, convos);
            user.categories.set(category, conversationMap);
            console.log('user2', user)
        }

        const updatedUser = await user.save();
        res.locals.updatedUser = updatedUser;
        return next();

    } catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error in chatController.saveConvo',
            status: 400,
            message: { err: 'An error occurred in chatController.saveConvo' },
        })
    }
}
      




    // const updatedUser = await User.updateOne(
    //     { username: username },
    //     [
    //         {
    //             $set: {
    //                 [`categories.${category}`]: { $ifNull: [ `categories.${category}`, {} ] },
    //                 [`categories.${category}.${title}`]: { $ifNull: [ `categories.${category}.${title}`, [] ] }
    //             }
    //         },
    //         {
    //             $push: { [`categories.${category}.${title}`]: { $each: convos } }
    //         }
    //     ]
    // );
      

module.exports = chatController;