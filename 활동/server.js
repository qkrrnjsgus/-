const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

// JSON 파일을 읽어오는 함수
function readUsersFromFile() {
    const data = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(data);
}

app.post('/signup', (req, res) => {
    const newUser = req.body;  // 클라이언트에서 보낸 회원 정보
    
    // 기존 users.json 파일에 새로운 회원 정보 추가
    const users = readUsersFromFile();
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));  // 예쁘게 들여쓰기해서 저장

    // 확인 메시지
    res.json({ message: '회원가입 성공' });
});

app.get('/users', (req, res) => {
    // 현재 users.json 파일에 저장된 모든 사용자 정보 출력
    const users = readUsersFromFile();
    res.json(users);  // JSON 형식으로 출력
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});