require('dotenv').config()
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const nodemailerHBS = require('nodemailer-express-handlebars')


const sendMail = (user) => {
    console.log(user)
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './routes/GlobalRoutes/Handlebars_View/',
            layoutsDir: './routes/GlobalRoutes/Handlebars_View/',
            defaultLayout: 'index.hbs',
        },
        viewPath: './routes/GlobalRoutes/Handlebars_View/',
        extName: '.hbs',
    };

    transporter.use('compile', nodemailerHBS(handlebarOptions))
    var mailOptions = {
        from: "Uma's Project",
        to: user.email,
        subject: "MERN Stack mini Project",
        template: 'index',
        context: {
            image: 'https://i.pinimg.com/236x/4f/fc/75/4ffc75e63bfb43e00655cc095c2e0a27.jpg',
            user: user
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            return true;
        }
    });
}

module.exports = {
    sendMail
}