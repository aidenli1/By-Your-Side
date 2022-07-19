// express 모듈을 가져옴
const express = require('express')
//새로운 express를 만듬
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB connected...')) // 접속시
    .catch(err => console.log('err ========= ' + err)) // 에러시

app.get('/', (req, res) => res.send('Helloo'))

// 회원가입
app.post('/register', (req, res) => {
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
app.post('/login', (req, res) => {
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

            })
        })
    })


})








app.listen(port, () => console.log(`on port ${port}!`))