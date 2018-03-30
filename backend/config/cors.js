module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://grifoo.southcentralus.cloudapp.azure.com')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}
