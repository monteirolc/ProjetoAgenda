exports.paginaInicial = (req, res) => {
  req.session.usuario = { nome: 'Lucas', logado: true }
  req.flash('success')
  res.render('index', {
    titulo: 'Este será o título da página',
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  })
  return
}

exports.trataPost = (req, res) => {
  res.send(`O que voce me enviou: ${req.body.cliente}`)
  return
}
