const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'rafaeljardim22@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })

}

const sendCanceledEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'rafaeljardim22@gmail.com',
        subject: 'Why did you cancel your account?',
        text: `Why did you cancel your account?, ${name}. You can send a suggest or other things to us.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCanceledEmail
}