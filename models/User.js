const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSChema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,

    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },

    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    imgae: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    Gender: {
        type: String
    },

})

userSChema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }



})

userSChema.methods.comparePassword = function (plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSChema)

module.exports = { User }