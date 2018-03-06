'use strict';
const nodemailer = require('nodemailer');

module.exports = {
    enviarCorreo: function (messageOptions) {
        console.log(messageOptions);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seolidera@gmail.com',
                pass: '*******'
            }
            // host: 'smtp.seolidera.com',
            // port: 465,
            // secure: true,
            // auth: {
            //     user: 'admin@seolidera.com',
            //     pass: '*****'
            // },
            // tls: {
            //     rejectUnauthorized: false
            // }
        });

        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages', success);
            }
        });

        const mailOptions = {
            from: '"Seolidera Google Partner" <seolidera@gmail.com>',
            to: 'adolfo@onrubia.es',
            subject: '❤ Bienvenido a tu Partner de Google ❤',
            text: 'That was easy!'
        };

        if (!messageOptions) {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return null
                } else {
                    console.log('Email sent: ' + info.response);
                    return info
                }
            });
        } else {
            transporter.sendMail(messageOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return null
                } else {
                    console.log('Email sent: ' + info.response);
                    return info
                }
            });
        }
    }
};
