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

//Para salvar usuários
const session = require('express-session')
//Para salvar as sessões em DB
const MongoStore = require('connect-mongo')
//Para mensagens autodestrutivas
const flash = require('connect-flash')
//Para fazer os caminhos e rotas da aplicação
const routes = require('./routes')
//Para routas/caminhos absolutos
const path = require('path')
//Configuração de segurança
// const helmet = require('helmet')
//Tokens de formularios para segurança
const csrf = require('csurf')
const {
  middlewareGlobal,
  checkCSRFError,
  csrfMiddleware
} = require('./src/middlewares/middleware')

//permite formulario ara dentro da aplicação
app.use(express.urlencoded({ extended: true }))
//formulários json
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
