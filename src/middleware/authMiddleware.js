const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;
    if (token == null) {
        return res.sendStatus(401); // 토큰이 없으면 401 Unauthorized 응답
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // 토큰 검증 실패시 403 Forbidden 응답
        }
        req.user = user; // 토큰이 유효하면, 요청 객체에 유저 데이터를 추가
        next();
    });
}

module.exports = authenticateToken;