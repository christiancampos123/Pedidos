exports.findAll = (req, res) => {

  const routes = {
    '/cliente': 'home.html',
    '/cliente/pedidos': 'pedidos.html',
    '/cliente/resumen': 'resumen.html',
    '/cliente/pedidoexitoso': 'exito.html',
    '/cliente/pedidosanteriores': 'pedidosAnteriores.html'
  }

  res.status(200).send(routes)
}