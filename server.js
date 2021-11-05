//Referente as variaveis de desenvolvimento
require('dotenv').config()

const express = require('express')
const app = express()

//Gerenciador do banco de dados MongoDB
const mongoose = require('mongoose')

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('conectado')
    app.emit('pronto')
  })
  .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
// const helmet = require('helmet')
const csrf = require('csurf')
const {
  middlewareGlobal,
  checkCSRFError,
  csrfMiddleware
} = require('./src/middlewares/middleware')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Permite acesso direto ao public
app.use(express.static(path.resolve(__dirname, 'public')))
// app.use(helmet)

//Configuração de sessão
const sessionOptions = session({
  secret: 'lkooo125125125lkooo',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})
app.use(sessionOptions)
app.use(flash())

//renderização de html
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
//Nossos próprios middlewares
app.use(middlewareGlobal)
app.use(checkCSRFError)
app.use(csrfMiddleware)
//Nossas rotas
app.use(routes)
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('http://localhost:3000')
    console.log('Server is running 3000 port')
  })
})
