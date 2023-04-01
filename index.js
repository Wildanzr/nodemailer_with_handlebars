const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

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
transporter.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve(__dirname, './views'),
    defaultLayout: false
  },
  viewPath: path.join(__dirname, './views'),
  extName: '.handlebars'
}))

// Create nodemailer mail options
const mailOptions = {
  from: 'wildanz.reyz@gmail.com',
  to: 'damodaradamiono665@gmail.com',
  subject: 'Hello from nodemailer',
  text: 'Hello from nodemailer',
  template: 'register',
  context: {
    name: 'Miawwwww',
    link: 'https://letscode.wildanzr.my.id/auth/activate?token=d6be7604a331d2df8ca3e157e655d59ec9180f07'
  }
}

// Send email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info)
  }
})
