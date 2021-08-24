require('dotenv').config()
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken')

const dbConnect = require('../DataBase/dbConfig');
const { getUser } = require('../DataBase/DBrequests');
const { verifyPassword } = require('../GlobalRoutes/hash_password');

loginRouter.post('/login', async (req, res) => {
    try {
        const dbObject = await dbConnect.getDB()

        if (!req.body.password) {
            return res.status(200).json({
                status: false,
                message: "password can't be blank"
            });

        } else {

            let collection = await dbObject.db(process.env.MAIN_DB_NAME).collection('registeredUsers')
            let email = req.body.email
            let user = await getUser({ email }, collection)
            if (!user) {
                return res.status(200).json({
                    status: false,
                    message: "email doesn't exists"
                })
            } else {
                let passwordCompare = await verifyPassword(req.body.password, user.password)
                console.log(passwordCompare);
                if (passwordCompare) {
                    delete user.password
                    jwt.sign({ email: user.email }, process.env.SECRETKEY, { expiresIn: 6000 }, (err, token) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.status(200).json({
                                status: true,
                                data: user,
                                token: token,
                                message: "login success"
                            })
                        }
                    })

                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Incorrect Password"
                    })
                }
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            error: error.message,
            message: "login failed"
        })
    }
})

module.exports = loginRouter