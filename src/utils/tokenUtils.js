const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
    return jwt.sign(data, process.env.SECRET, {expiresIn: '15m'});
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.SECRET, {expiresIn: '6h'});
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};