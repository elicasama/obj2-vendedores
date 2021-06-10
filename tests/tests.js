var assert = require("assert");
const Ciudad = require("../src/Ciudad");
const Provincia = require("../src/Provincia");
const Certificacion = require("../src/Certificacion");
const Vendedor = require("../src/Vendedor");
const VendedorFijo = require("../src/VendedorFijo");
const Viajante = require("../src/Viajante");
const ComercioCorresponsal = require("../src/ComercioCorresponsal");

describe("Pruebas", () => {
  describe(" Verificando a los vendedores según la ciudad en la que pueden trabajar", () => {
    describe("Verificando dónde puede trabajar un Vendedor Fijo", () => {
      it("Un vendedorFijo puede trabajar en Capital Federal si su ciudadOrigen = capitalFederal", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(true, vendedorFijo.puedeTrabajarEn(capitalFederal));
      });
      it("Un vendedorFijo NO puede trabajar en Capital Federalsi su ciudadOrigen = laPlata", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const laPlata = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(false, vendedorFijo.puedeTrabajarEn(laPlata));
      });
    });
    describe("Verificando dónde puede trabajar un Viajante", () => {
      it("Un viajante puede trabajar en una provincia en la que esté habilitado", () => {
        const buenosAires = new Provincia(3200);
        const santaFe = new Provincia(6800);
        const neuquen = new Provincia(2000);
        const capitalFederal = new Ciudad(buenosAires);
        const provinciasHabilitadas = [buenosAires, santaFe, neuquen];
        const viajante = new Viajante(provinciasHabilitadas);
        assert.equal(
          true,
          viajante.puedeTrabajarEn(provinciasHabilitadas, capitalFederal)
        );
      });
      it("Un Viajante NO puede trabajar en Bariloche si no está habilitado en Neuquen ", () => {
        const buenosAires = new Provincia(3200);
        const santaFe = new Provincia(6800);
        const neuquen = new Provincia(2000);
        const bariloche = new Ciudad(neuquen);
        const provinciasHabilitadas = [buenosAires, santaFe];
        const viajante = new Viajante(provinciasHabilitadas);
        assert.equal(
          false,
          viajante.puedeTrabajarEn(provinciasHabilitadas, bariloche)
        );
      });
    });
    describe("Un ComercioCorresponsal tiene sucursales en distintas ciudades", () => {
      it("Un ComercioCorresponsal puede trabajar en la sucursal de Capital Federal si tiene esa ciudad", () => {
        const buenosAires = new Provincia(3200);
        const neuquen = new Provincia(2000);
        const capitalFederal = new Ciudad(buenosAires);
        const bariloche = new Ciudad(neuquen);
        const laPlata = new Ciudad(buenosAires);
        const ciudades = [capitalFederal, bariloche, laPlata];
        const comercioCorresponsal = new ComercioCorresponsal(ciudades);
        assert.equal(
          true,
          comercioCorresponsal.puedeTrabajarEn(capitalFederal)
        );
      });
      it("Un ComercioCorresponsal NO puede trabajar en la sucursal de Capital Federal si no tiene esa ciudad", () => {
        const buenosAires = new Provincia(3200);
        const neuquen = new Provincia(2000);
        const capitalFederal = new Ciudad(buenosAires);
        const bariloche = new Ciudad(neuquen);
        const laPlata = new Ciudad(buenosAires);
        const ciudades = [bariloche, laPlata];
        const comercioCorresponsal = new ComercioCorresponsal(ciudades);
        assert.equal(
          false,
          comercioCorresponsal.puedeTrabajarEn(capitalFederal)
        );
      });
    });
  });

  describe(" Verificando si un vendedor es Versatil", () => {
    it("Un vendedor es versatil si tiene 3 o más certficaciones y al menos 1 es de productos y 1 no lo es", () => {
      const vendedor = new Vendedor();
      const certificacionP1 = new Certificacion(true, 10); // Es de producto
      const certificacionP2 = new Certificacion(true, 50); // Es de producto
      const certificacionP3 = new Certificacion(true, 5); // Es de producto
      const certificacionNP1 = new Certificacion(false, 20); // No es de producto
      vendedor.agregarCertificacion(certificacionP1);
      vendedor.agregarCertificacion(certificacionP2);
      vendedor.agregarCertificacion(certificacionP3);
      vendedor.agregarCertificacion(certificacionNP1);
      assert.equal(true, vendedor.esVersatil());
    });
    it("Un vendedor NO versatil si tiene menos de 3 certficaciones aunque tengan  1 de productos y 1 que no lo es", () => {
      const vendedor = new Vendedor();
      const certificacionP1 = new Certificacion(true, 10); // Es de producto
      const certificacionNP1 = new Certificacion(false, 20); // No es de producto
      vendedor.agregarCertificacion(certificacionP1);
      vendedor.agregarCertificacion(certificacionNP1);
      assert.equal(false, vendedor.esVersatil());
    });
    it("Un vendedor NO versatil si tiene 3 certficaciones y NO tiene aunque sea 1 de productos y 1 que no lo es", () => {
      const vendedor = new Vendedor();
      const certificacionNP1 = new Certificacion(false, 10); // No es de producto
      const certificacionNP2 = new Certificacion(false, 50); // No es de producto
      const certificacionNP3 = new Certificacion(false, 5); // NO es de producto
      const certificacionNP4 = new Certificacion(false, 20); // No es de producto
      vendedor.agregarCertificacion(certificacionNP1);
      vendedor.agregarCertificacion(certificacionNP2);
      vendedor.agregarCertificacion(certificacionNP3);
      vendedor.agregarCertificacion(certificacionNP4);
      assert.equal(false, vendedor.esVersatil());
    });
    it("Un vendedor NO versatil si tiene 3 certficaciones y no tiene aunque sea 1 que no sea de productos", () => {
      const vendedor = new Vendedor();
      const certificacionP1 = new Certificacion(true, 10); // Es de producto
      const certificacionP2 = new Certificacion(true, 50); // Es de producto
      const certificacionP3 = new Certificacion(true, 5); // Es de producto
      const certificacionP4 = new Certificacion(true, 20); // Es de producto
      vendedor.agregarCertificacion(certificacionP1);
      vendedor.agregarCertificacion(certificacionP2);
      vendedor.agregarCertificacion(certificacionP3);
      vendedor.agregarCertificacion(certificacionP4);
      assert.equal(false, vendedor.esVersatil());
    });
  });
  describe(" Verificando si un vendedor es FIRME", () => {
    it("Un vendedor es Firme si tiene un puntaje de 30 o mayor en el total de sus certificaciones", () => {
      const vendedor = new Vendedor();
      const certificacionP1 = new Certificacion(true, 10);
      const certificacionP2 = new Certificacion(true, 50);
      const certificacionP3 = new Certificacion(true, 5);
      const certificacionNP1 = new Certificacion(false, 20);
      vendedor.agregarCertificacion(certificacionP1);
      vendedor.agregarCertificacion(certificacionP2);
      vendedor.agregarCertificacion(certificacionP3);
      vendedor.agregarCertificacion(certificacionNP1);
      assert.equal(true, vendedor.esFirme());
    });
    it("Un vendedor NO es Firme si tiene un puntaje de menor a 30en el total de sus certificaciones", () => {
      const vendedor = new Vendedor();
      const certificacionP1 = new Certificacion(true, 1);
      const certificacionP2 = new Certificacion(true, 5);
      const certificacionP3 = new Certificacion(true, 5);
      const certificacionNP1 = new Certificacion(false, 2);
      vendedor.agregarCertificacion(certificacionP1);
      vendedor.agregarCertificacion(certificacionP2);
      vendedor.agregarCertificacion(certificacionP3);
      vendedor.agregarCertificacion(certificacionNP1);
      assert.equal(false, vendedor.esFirme());
    });
  });

  describe(" Verificando Influencia", () => {
    describe(" Verificando si un vendedor Fijo es influyente", () => {
      it("Ningun Vendedor Fijo es influyente", () => {
        const vendedorFijo = new VendedorFijo();
        assert.equal(false, vendedorFijo.esInfluyente());
      });
    });
    describe(" Verificando si un Viajante es influyente", () => {
      it("Un Viajante es influyente si la suma total de todas las provincias habilitadas da 10000000 (10Millones) de personas o más", () => {
        const buenosAires = new Provincia(13200);
        const santaFe = new Provincia(600800);
        const neuquen = new Provincia(20000000);
        const provinciasHabilitadas = [buenosAires, santaFe, neuquen];
        const viajante = new Viajante(provinciasHabilitadas);
        assert.equal(true, viajante.esInfluyente());
      });
      it("Un Viajante NO es influyente si la suma total de todas las persinas en las provincias habilitadas es menor a 10000000 (10Millones) de personas", () => {
        const buenosAires = new Provincia(132);
        const santaFe = new Provincia(600);
        const neuquen = new Provincia(200);
        const provinciasHabilitadas = [buenosAires, santaFe, neuquen];
        const viajante = new Viajante(provinciasHabilitadas);
        assert.equal(false, viajante.esInfluyente());
      });
    });
    describe(" Verificando si un Comercio Corresponsal es influyente", () => {
      describe("Un Comercio Corresponsal es Influyente si: Tiene surcursales en 5 Cuidades o 3 provincias con sucursales", () => {
      it("Un Comercio Corresponsal es Influyente si: Tiene surcursales en 5 Cuidades", () => {
        const buenosAires = new Provincia(3200);
        const neuquen = new Provincia(2000);
        const capitalFederal = new Ciudad(buenosAires);
        const bariloche = new Ciudad(neuquen);
        const laPlata = new Ciudad(buenosAires);
        const berazategui = new Ciudad(buenosAires);
        const ciudades = [bariloche, laPlata, bariloche, berazategui, neuquen, capitalFederal];
        const comercioCorresponsal = new ComercioCorresponsal(ciudades);
        assert.equal(true, comercioCorresponsal.esInfluyente());
      });
      it("Un Comercio Corresponsal es Influyente si: está en tres provincias (aunque no tenga 5 ciudades)", () => {
        const buenosAires = new Provincia(3200);
        const neuquen = new Provincia(2000);
        const santaFe = new Provincia(3600);
        const capitalFederal = new Ciudad(buenosAires);
        const sanLorenzo = new Ciudad(santaFe);
        const laPlata = new Ciudad(buenosAires);
        const ciudades = [sanLorenzo, laPlata, neuquen, capitalFederal];
        const comercioCorresponsal = new ComercioCorresponsal(ciudades);
        assert.equal(true, comercioCorresponsal.esInfluyente());
      });
      it("Un Comercio Corresponsal NO es Influyente si: No está en 5 ciudades ni en 3 provincias", () => {
        const buenosAires = new Provincia(3200);
        const neuquen = new Provincia(2000);
        const capitalFederal = new Ciudad(buenosAires);
        const berazategui = new Ciudad(buenosAires);
        const laPlata = new Ciudad(buenosAires);
        const ciudades = [berazategui, laPlata, neuquen, capitalFederal];
        const comercioCorresponsal = new ComercioCorresponsal(ciudades);
        assert.equal(false, comercioCorresponsal.esInfluyente());
      });
    });
  });
  });
});
