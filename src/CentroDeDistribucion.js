const errores = require("./errores");
var _ = require("lodash");

module.exports = class CentroDeDistribucion {
  constructor(ciudad, vendedores) {
    this.vendedores = vendedores;
    this.ciudad = ciudad;
  }

  agregarVendedor(nuevoVendedor) {
    if (this.vendedores.includes(nuevoVendedor)) {
      throw new errores.ElVendedorYaExisteError();
    } else {
      this.vendedores.push(nuevoVendedor);
    }
  }

  vendedorEstrella() {
    // return _.maxBy(this.vendedores, (it) => it.puntajeCertificaciones());

    return this.vendedores.reduce((vendedor, vendedorActual) =>
      vendedor.puntajeCertificaciones() >
      vendedorActual.puntajeCertificaciones()
        ? vendedor
        : vendedorActual
    );
  }
  esRobusto() {
    return (
      _.countBy(this.vendedores, (vendedor) => vendedor.esFirme()).true >= 3
    );
  }

  vendedoresGenericos() {
    return this.vendedores.filter((vendedor) => vendedor.esGenerico());
  }

  puedeCubir(ciudad) {
    return (
      _.countBy(this.vendedores, (vendedor) => vendedor.puedeTrabajarEn(ciudad))
        .true >= 1
    );
  }
};
