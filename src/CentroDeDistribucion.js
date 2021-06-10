const errores = require("./errores");

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
      this.vendedores.filter((vendedor) => {
        return vendedor.esFirme();
      }).length >= 3
    );
  }

  vendedoresGenericos() {
    return this.vendedores.filter((vendedor) => {
      return vendedor.esUnVendedorGenerico();
    });
  }

  puedeCubir(ciudad) {
    return (
      this.vendedores.filter((vendedor) => vendedor.puedeTrabajarEn(ciudad))
        .length >= 1
    );
  }
};
