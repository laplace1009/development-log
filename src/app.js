require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? process.env.PROD_URL : process.env.DEV_URL;

app.use(express.text())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction, httpOnly: isProduction, sameSite: 'Lax' }
}));
app.use((req, res, next) => {
    req.baseUrl = baseUrl;
    next();
})

app.use(routes);
app.use(express.static(__dirname + '/../public/'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})