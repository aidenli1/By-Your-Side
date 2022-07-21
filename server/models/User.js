const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSChema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,

    },
    age: {
        type: Number
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

userSChema.methods.generateToken = function (cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSChema.statics.findByToken = function ( token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디 이용해서 유저를 찾은 다음 클라이언트에서 가져온 token과 db에 보관된 
        // 토큰이 일치하는지 확인

        user.findOne({"_id":decoded, "token" : token}, function (err,user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSChema)

module.exports = { User }