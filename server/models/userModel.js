const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


// const messageSchema = new mongoose.Schema({
//     role: String,
//     content: String
// }, { _id: false })

// const userSchema = new Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     categories: {
//         type: Map,
//         of: {
//             type: Map,
//             of: [messageSchema]
//         }
//     }
// })

const conversationSchema = new mongoose.Schema({}, { strict: false });

const topicSchema = new mongoose.Schema({
  type: Map,
  of: [conversationSchema],
});

const categorySchema = new mongoose.Schema({
  type: Map,
  of: topicSchema,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: {
    type: Map,
    of: categorySchema,
    default: () => new Map(),
  },
});

/* User
{
  username: String,
  password: String,x
  categories: {
    customTopic1: {
      customConvo1: [obj1, obj2, obj3...]
    }
  }
}
*/

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();


    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next();
    })
})

const User = mongoose.model('user', userSchema);

module.exports = User;