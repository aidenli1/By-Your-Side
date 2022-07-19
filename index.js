// express 모듈을 가져옴
const express = require('express')
//새로운 express를 만듬
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb+srv://aiden:aiden@aiden.1l3v9.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://by-your:hjg0821@by-your.o6dcz.mongodb.net/?retryWrites=true&w=majority', {
}).then(() => console.log('MongoDB connected...')) // 접속시
    .catch(err => console.log('err ========= ' + err)) // 에러시

app.get('/', (req, res) => res.send('Helloo'))

// 회원가입
app.post('/register', (req, res) => {
    // 회원가입할때 필요한 정보들을 client 에서 가져오면 그것들을 DB에 넣어준다.


    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})
app.listen(port, () => console.log(`on port ${port}!`))