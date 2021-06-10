const Vendedor = require("./Vendedor");

module.exports = class ComercioCorresponsal extends Vendedor {
    constructor(ciudades){
        super();
        this.ciudades = ciudades;
    }

    puedeTrabajarEn(ciudad) {
        return this.ciudades.includes(ciudad);
      }
}

