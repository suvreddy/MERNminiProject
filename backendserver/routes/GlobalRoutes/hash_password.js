require('dotenv').config()
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {

    let hash = bcrypt.hash(password, Number(process.env.SALT));
    return hash
}
const verifyPassword = async (password, hashedPassword) => {

    let hash = bcrypt.compare(password, hashedPassword);
    return hash
}

module.exports = {
    hashPassword,
    verifyPassword
}