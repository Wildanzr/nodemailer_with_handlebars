const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const dotenv = require('dotenv')

// Load env
dotenv.config()

console.log(process.env.OAUTH_EMAIL)

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

// Set Credentials
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken()

// Create nodemailer config
const configOptions = {
  service: 'gmail',
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    type: 'OAuth2',
    user: process.env.OAUTH_EMAIL,
    accessToken,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
}

// Create nodemailer transporter
const transporter = nodemailer.createTransport(configOptions)
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve(__dirname, './views'),
      defaultLayout: false
    },
    viewPath: path.join(__dirname, './views'),
    extName: '.handlebars'
  })
)

// Create nodemailer mail options
const mailOptions = {
  from: process.env.OAUTH_EMAIL,
  to: 'graita.sukma@gmail.com',
  subject: 'Aktivasi Akun LetsCode',
  text: 'Hello from nodemailer',
  template: 'register',
  context: {
    name: 'Miawwwww',
    link: 'https://letscode.wildanzr.my.id/auth/activate?token=d6be7604a331d2df8ca3e157e655d59ec9180f07',
    alternative: 'https://letscode.wildanzr.my.id/auth/activate?token=d6be7604a331d2df8ca3e157e655d59ec9180f07'
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
