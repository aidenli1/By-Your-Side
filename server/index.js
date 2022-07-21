const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const { auth } = require('./middleware/auth');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB connected...')) // 접속시
    .catch(err => console.log('err ========= ' + err)) // 에러시


// 회원가입
app.post('/api/users/register', (req, res) => {
    // 회원가입할때 필요한 정보들을 client 에서 가져오면 그것들을 DB에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})

// 로그인
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일 DB에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 유저가 없습니다."
            })
        }
        // 이메일이 있다면 비밀번호가 맞는지
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            // 위에 상황이 다 성공하면 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰 저장
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

// role 1 => admin
// role 0 => user

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication = True라는 뜻

    // role 0 -> 일반 유저
    // role !0 -> 관리자

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})


app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})






app.listen(port, () => console.log(`on port ${port}!`))