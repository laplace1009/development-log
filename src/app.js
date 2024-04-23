const express = require('express');
const session = require('express-session');
const registerUserRoute = require('./routes/registerUser');
const loginUserRoute = require('./routes/login');
const tokenRouter = require('./routes/token');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

app.use(registerUserRoute)
app.use(loginUserRoute)
app.use(tokenRouter)

app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.send(`Number of views: ${req.session.views}`);
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})