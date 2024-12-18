const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// JSON 파일 경로 설정
const usersFile = path.join(__dirname, 'users.json');

// 미들웨어 설정
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // HTML 파일을 제공하는 경로

// 회원가입 POST 요청 처리
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // 새로운 사용자 데이터
    const newUser = {
        name,
        email,
        password
    };

    // users.json 파일 읽기
    fs.readFile(usersFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // 이미 이메일이 존재하는지 체크
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
        }

        // 새로운 사용자 추가
        users.push(newUser);

        // JSON 파일에 새로운 데이터 저장
        fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: '회원가입에 실패했습니다.' });
            }

            return res.status(200).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
        });
    });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});