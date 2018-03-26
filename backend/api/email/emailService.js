const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SendEmailService = {
  send : (message, callback) => {
    sgMail.send(message);
  }
}

module.exports = SendEmailService
