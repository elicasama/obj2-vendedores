const Vendedor = require("./Vendedor");

module.exports = class Viajante extends Vendedor {
  constructor(provinciasHabilitadas) {
    super();
    this.provinciasHabilitadas = provinciasHabilitadas;
  }

  puedeTrabajarEn(provinciasHabilitadas, ciudad) {
    return provinciasHabilitadas.includes(ciudad.provincia);
  }
};
