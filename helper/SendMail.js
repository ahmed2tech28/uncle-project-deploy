import nodemailer from "nodemailer"

export const verificationEmail = (user) => {
    let mymail = "ahmedalirana28@gmail.com"
    let password = "blvh ieow mqal exxx"
    let { email, verificationCode } = user
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mymail, // Your email address
            pass: password // Your email password or an application-specific password
        },
        port: 587,
    });

    let mailOptions = {
        from: mymail,
        to: email,
        subject: 'Your Verification Code from Orbiologics',
        html: `<h1 style="text-align:center;">Your Verification Code</h1><br><br><h1 style="text-align:center;color:red;">${verificationCode}</h1>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


export const confirmationEmail = (user) => {
    let mymail = "ahmedalirana28@gmail.com"
    let password = "blvh ieow mqal exxx"
    let { email, message, phone } = user
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mymail, // Your email address
            pass: password // Your email password or an application-specific password
        },
        port: 587,
    });

    let mailOptions = {
        from: mymail,
        to: email,
        subject: 'Email Send Successfully',
        html: `<h1 style="text-align:center;">Mail Send Successfully your message is ${message}</h1><br><br><h1 style="text-align:center;color:red;">${phone}</h1>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}



export const generalResponse = (user) => {
    let mymail = "ahmedalirana28@gmail.com"
    let password = "blvh ieow mqal exxx"
    let { email, message } = user
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mymail, // Your email address
            pass: password // Your email password or an application-specific password
        },
        port: 587,
    });

    let mailOptions = {
        from: mymail,
        to: email,
        subject: 'Response from admin user',
        html: `<div>This is the response from the Admin user <span style="background:'#ff0'">${message}</span></div>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}