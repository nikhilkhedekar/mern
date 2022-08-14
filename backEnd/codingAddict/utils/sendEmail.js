const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount =  nodemailer.createTestAccount();
    
  const transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: "mvmoaviiyvb77abs@ethereal.email",//testAccount.user,
      pass: "GhCkR9r613HGsdxVgW",//testAccount.pass,
    },
  });
  
  return transporter.sendMail({
    from: '"Coding Addict" <codingaddict@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
