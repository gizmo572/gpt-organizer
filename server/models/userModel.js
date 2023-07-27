const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


const chatSchema = new mongoose.Schema({
    role: String,
    content: String
}, { _id: false })

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    categories: {
        type: Map,
        of: {
            type: Map,
            of: [chatSchema]
        }
    }
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next();
    })
})

const User = mongoose.model('user', userSchema);

module.exports = User;