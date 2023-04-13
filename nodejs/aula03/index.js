//const calculos = require('./calculos.js')
const {soma, multiplicacao} = require('./calculos.js')//importação dos módulos separadamente

const resultado = multiplicacao(10, 20)
const resultado2 = soma(15, 30)
console.log(resultado, resultado2)