const Vendedor = require("./Vendedor");

module.exports = class VendedorFijo extends Vendedor {
  constructor(ciudadOrigen) {
    super();
    this.ciudadOrigen = ciudadOrigen;
  }

  puedeTrabajarEn(ciudad) {
    return this.ciudadOrigen === ciudad;
  }

  esInfluyente() {
    return false;
  }
};
