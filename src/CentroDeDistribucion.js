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
    return this.vendedores.reduce(function (anterior, vendedor) {
      return anterior.puntajeCertificaciones() >
        vendedor.puntajeCertificaciones()
        ? anterior
        : vendedor;
    });
  }

  esRobusto() {
    return (
      _.countBy(this.vendedores, (vendedor) => vendedor.esFirme()).true >= 3
    );
  }

  vendedoresGenericos() {
    return this.vendedores.filter((vendedor) => {
      return vendedor.esGenerico();
    });
  }

  puedeCubir(ciudad) {
    return (
      _.countBy(this.vendedores, (vendedor) => vendedor.puedeTrabajarEn(ciudad)).true >= 1
    );
  }
};
