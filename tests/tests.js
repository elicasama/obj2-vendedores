var assert = require("assert");
const Ciudad = require("../src/Ciudad");
const Provincia = require("../src/Provincia");
const Certificacion = require("../src/Certificacion");
const Vendedor = require("../src/Vendedor");
const VendedorFijo = require("../src/VendedorFijo");
const Viajante = require("../src/Viajante");
const ComercioCorresponsal = require("../src/ComercioCorresponsal");

describe("Pruebas", () => {
  describe("Verificando dónde puede trabajar un Vendedor Fijo", () => {
    it("Un vendedorFijo puede trabajar en Bs As si su ciudadOrigen = Bs As", () => {
     // const vendedor = new Vendedor();
      const BuenosAires = new Provincia(3200); // BuenosAires tiene 3200 habitantes
      const capital_federal = new Ciudad(BuenosAires); // BsAs está en la provincia BuenosAires
      const vendedorFijo = new VendedorFijo(capital_federal ); //el vendedor tiene como ciudadOrigen= BsAs
      assert.equal(true, vendedorFijo.puedeTrabajarEn(capital_federal));
    });
    it("Un vendedorFijo NO puede trabajar en Bs As si su ciudadOrigen = La_Plata", () => {
      // const vendedor = new Vendedor();
       const BuenosAires = new Provincia(3200); // BuenosAires tiene 3200 habitantes
       const BsAs = new Ciudad(BuenosAires); // BsAs está en la provincia BuenosAires
       const la_plata = new Ciudad(BuenosAires);
       const vendedorFijo = new VendedorFijo(BsAs); //el vendedor tiene como ciudadOrigen= BsAs
       assert.equal(false, vendedorFijo.puedeTrabajarEn(la_plata));
     });
  });
});
