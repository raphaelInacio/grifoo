const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey("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");

const SendEmailService = {
  send : (message, callback) => {
    sgMail.send(msg);
  }
}

module.exports = SendEmailService