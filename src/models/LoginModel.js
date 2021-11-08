const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register() {
    this.verify()
    if (this.errors.length > 0) return
    await this.userExists()
    if (this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.bady.password, salt)
    try {
      this.user = await LoginModel.create(this.body)
    } catch (e) {
      console.log(e)
    }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if (user) this.errors.push('Usuário já existe')
  }

  verify() {
    this.cleanUp()
    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail ou senha inválido')

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha tem que ter entre 3 e 50 caracteres')
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login
