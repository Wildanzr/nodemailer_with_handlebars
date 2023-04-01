const nodemailer = require('nodemailer')

// Create nodemailer config
const configOptions = {
  host: 'smtp.gmail.com',
  port: 587,
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  auth: {
    user: 'wildanz.reyz@gmail.com',
    pass: 'mmthretwwujrgapy'
  }
}

// Create nodemailer transporter
const transporter = nodemailer.createTransport(configOptions)

// Create nodemailer mail options
const mailOptions = {
  from: 'wildanz.reyz@gmail.com',
  to: 'meowgapus@gmail.com',
  subject: 'Hello from nodemailer',
  text: 'Hello from nodemailer'
}

// Send email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info)
  }
})
