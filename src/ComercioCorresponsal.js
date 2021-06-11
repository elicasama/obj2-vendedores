const Vendedor = require("./Vendedor");
var _ = require("lodash");

module.exports = class ComercioCorresponsal extends Vendedor {
  constructor(ciudades) {
    super();
    this.ciudades = ciudades;
  }

  puedeTrabajarEn(ciudad) {
    return this.ciudades.includes(ciudad);
  }

  esInfluyente() {
    return this.ciudades.length >= 5 || this.cantidadDeProvincias() >= 3;
  }

  cantidadDeProvincias() {
    return _.uniq(this.ciudades.map((ciudad) => ciudad.provincia)).length;
  }
};
