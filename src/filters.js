import numeral from "numeral";

const addSymbolChilenoFilter = function(number) {
  return "(CLP) " + numeral(number).format("0,0.00");
};

const roundNumberFilter = function(numero) {
  var decimales = 2;
  var flotante = parseFloat(numero);
  var resultado =
    Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
  return numeral(resultado).format("0,0.00");
};

export { addSymbolChilenoFilter, roundNumberFilter };
