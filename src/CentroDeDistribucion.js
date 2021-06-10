module.exports = class CentroDeDistribucion {
  constructor(ciudad, vendedores) {
    this.vendedores = vendedores;
    this.ciudad = ciudad;
  }

  agregarVendedor(nuevoVendedor) {
    if (this.vendedores.includes(nuevoVendedor)) {
      throw "El vendedor ya existe!";
    } else {
      this.vendedores.push(nuevoVendedor);
    }
  }
  vendedorEstrella() {
    const mejorvendedor = this.vendedores.reduce(function (anterior, vendedor) {
      return anterior.puntajeCertifiaciones() > vendedor.puntajeCertifiaciones()
        ? anterior
        : vendedor;
    });
    return mejorvendedor;
  }
  esRobusto(){
       return this.vendedores.filter((vendedor)=> { return vendedor.esFirme()}).length >=3
  }
};
