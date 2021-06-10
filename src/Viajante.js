const Vendedor = require("./Vendedor");
var _ = require("lodash");

module.exports = class Viajante extends Vendedor {
  constructor(provinciasHabilitadas) {
    super();
    this.provinciasHabilitadas = provinciasHabilitadas;
  }

  puedeTrabajarEn(provinciasHabilitadas, ciudad) {
    return provinciasHabilitadas.includes(ciudad.provincia);
  }

  esInfluyente() {
    return this.cantidadPersonas() >= 10000000;
  }

  cantidadPersonas() {
    return _.sumBy(
      this.provinciasHabilitadas,
      (provincia) => provincia.poblacion
    );
  }
};
