const Vendedor = require("./Vendedor");

module.exports = class VendedorFijo extends Vendedor{
  puedeTrabajarEn(ciudadOrigen) {
    return ciudad === ciudadOrigen;
  }
};

