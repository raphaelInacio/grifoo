const enviroments = require('../config/enviroments')
const api_key = enviroments.emailKey
const domain = 'www.grifoo.com';

const mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
});

const EmailSender = {
    send: (from, to, subject, template) => {

        let data = {
            from: from,
            to: to,
            subject: subject,
            html: template
        };

        mailgun.messages().send(data, function (err, body) {
            if (err) throw err;
            console.log(body);
        });
    }
}

module.exports = EmailSender