require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }))

app.use('/loginRouter', require('./routes/login/login_router'))
app.use('/registerRouter', require('./routes/register/register_router'))

// creating server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`)
});

module.exports = app;