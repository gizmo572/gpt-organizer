const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const chatSchema = new Schema({
    key: String,
    value: String
}, { _id: false })

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: { type: Map, of: [chatSchema] }
})

userSchema.pre('save', function(next) {
    console.log('????!!!!??')
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        console.log('bruh', err, 'hash', hash)
        if (err) return next(err);
        this.password = hash;
        console.log('hihihihihihi')
        return next();
    })
})

const User = mongoose.model('user', userSchema);

module.exports = User;