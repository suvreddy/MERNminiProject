require('dotenv').config()
const registerRouter = require('express').Router();

const dbConnect = require('../DataBase/dbConfig');
const { getUser, postData } = require('../DataBase/DBrequests');

const { getTime } = require('../GlobalRoutes/get_time');
const hashPasswordObject = require('../GlobalRoutes/hash_password');
const { sendMail } = require('../GlobalRoutes/mail_send');


registerRouter.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const dbObject = await dbConnect.getDB();
        if (!req.body.name) {
            return res.status(200).json({
                status: false,
                message: "Name can't be blank"
            });
        } else if (!req.body.email) {
            return res.status(200).json({
                status: false,
                message: "Email can't be blank"
            });
        } else if (!req.body.password) {
            return res.status(200).json({
                status: false,
                message: "password can't be blank"
            });

        } else if (!req.body.gender) {
            return res.status(200).json({
                status: false,
                message: "gender can't be blank"
            });
        } else {

            let collection = await dbObject.db(process.env.MAIN_DB_NAME).collection('registeredUsers')

            let user_existed = await getUser({ email: req.body.email }, collection)
            if (user_existed) {
                return res.status(200).json({
                    status: false,
                    message: "email already exists"
                })
            }

            const time = await getTime()
            const modifiedDate = null
            const creationDate = time.year + "-" + time.month + "-" + time.dt + " " + time.hour + ":" + time.min
            const hash = await hashPasswordObject.hashPassword(req.body.password)

            let user = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                dob: req.body.dob,
                gender: req.body.gender,
                skills: req.body.skills,
                creationDate,
                modifiedDate
            }

            const response = await postData(user, collection)
            if (response.status === true) {
                await sendMail(user)
                return res.status(200).json({
                    'status': response.status,
                    'message': `user created sucessfully`,
                    user_info: user
                })
            }
            else {
                return res.status(200).json({
                    'status': response.status,
                    'message': response.message,
                    user_info: user
                })
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            error: error.message,
            message: "registration failed"
        })
    }
})

module.exports = registerRouter