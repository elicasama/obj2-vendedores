const Vendedor = require("./Vendedor");

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
    return this.provinciasHabilitadas.reduce((sum, provincia) => {
      const totalPersonas = sum + provincia.poblacion;
      return totalPersonas;
    }, 0);
  }
};
