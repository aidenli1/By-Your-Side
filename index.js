// express 모듈을 가져옴
const express = require('express')
//새로운 express를 만듬
const app = express()
// 백 서버
const port = 5000

// mongodb+srv://aiden:aiden@aiden.1l3v9.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://by-your:hjg0821@by-your.o6dcz.mongodb.net/?retryWrites=true&w=majority', {
}).then(() => console.log('MongoDB connected...')) // 접속시
    .catch(err => console.log('err ========= '+err)) // 에러시

app.get('/', (req, res) => res.send('Helloo'))
app.listen(port, () => console.log(`on port ${port}!`))