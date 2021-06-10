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
    const mejorvendedor = this.vendedores.reduce(function (anterior, vendedor) {
      return anterior.puntajeCertificaciones() > vendedor.puntajeCertificaciones()
        ? anterior
        : vendedor;
    });
    return mejorvendedor;
  }
  esRobusto() {
    return (
      this.vendedores.filter((vendedor) => {
        return vendedor.esFirme();
      }).length >= 3
    );
  }

  // Consultar:
  // La colección de vendedores genéricos registrados.
  // Un vendedor se considera genérico si tiene al menos
  // una certificación que no es de productos.

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
