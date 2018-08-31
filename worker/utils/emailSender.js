const enviroments = require('../config/enviroments')
const api_key = enviroments.emailKey
const domain = 'www.grifoo.com';
const logger = require('../config/logs')

const mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
});

const EmailSender = {
    send: (from, to, subject, template) => {
        
        logger.info(`Send email to: ${to}`)

        let data = {
            from: from,
            to: to,
            subject: subject,
            html: template
        };

        mailgun.messages().send(data, function (err, body) {
            if (err) throw err;
            logger.info(body);
        });
    }
}

module.exports = EmailSender