const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(mailOptions) {
  const info = await transporter.sendMail({
    from: "admin@admin.com",
    to: mailOptions.userEmail,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html,
  });

  console.log("Message sent: %s", info.messageId);
}


module.exports = sendEmail;
