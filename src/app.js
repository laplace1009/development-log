const express = require('express');
const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const session = require('express-session');
const registerUserRoute = require('./routes/registerUser');
const loginUserRoute = require('./routes/login');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(registerUserRoute)
app.use(loginUserRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})


app.listen(3000);