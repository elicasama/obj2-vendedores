var assert = require("assert");
const Ciudad = require("../src/Ciudad");
const Provincia = require("../src/Provincia");
const Certificacion = require("../src/Certificacion");
const Vendedor = require("../src/Vendedor");
const VendedorFijo = require("../src/VendedorFijo");
const Viajante = require("../src/Viajante");
const ComercioCorresponsal = require("../src/ComercioCorresponsal");
const CentroDeDistribucion = require("../src/CentroDeDistribucion");
const errores = require("../src/errores");

describe("Pruebas", () => {
  describe(" Verificando a los vendedores según la ciudad en la que pueden trabajar", () => {
    describe("Verificando dónde puede trabajar un VENDEDOR FIJO", () => {
      it("Un vendedor fijo puede trabajar en Capital Federal si su ciudadOrigen = capitalFederal", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(true, vendedorFijo.puedeTrabajarEn(capitalFederal));
      });
      it("Un vendedor fijo NO puede trabajar en Capital Federal si su ciudadOrigen = laPlata", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const laPlata = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(false, vendedorFijo.puedeTrabajarEn(laPlata));
      });
    });
    describe("Verificando dónde puede trabajar un VIAJANTE", () => {
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
      it("Un viajante NO puede trabajar en Bariloche si no está habilitado en Neuquen ", () => {
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
    describe("Verificando si un COMERCIO CORRESPONSAL tiene sucursales en determinadas ciudades", () => {
      it("Un comercio corresponsal puede trabajar en la sucursal de Capital Federal si tiene esa ciudad", () => {
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
      it("Un comercio corresponsal NO puede trabajar en la sucursal de Capital Federal si no tiene esa ciudad", () => {
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
  describe("Verificando cómo es un vendedor", () => {
    describe("Verificando si un vendedor es VERSATIL", () => {
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

    describe("Verificando vendedor es INFLUYENTE", () => {
      describe(" Verificando si un VENDEDOR FIJO es influyente", () => {
        it("Ningun Vendedor Fijo es influyente", () => {
          const vendedorFijo = new VendedorFijo();
          assert.equal(false, vendedorFijo.esInfluyente());
        });
      });
      describe(" Verificando si un VIAJANTE es influyente", () => {
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

      describe(" Verificando si un COMERCIO CORRESPONSAL es influyente", () => {
        describe("Un Comercio Corresponsal es Influyente si: Tiene surcursales en 5 Cuidades o 3 provincias con sucursales", () => {
          it("Un Comercio Corresponsal es Influyente si: Tiene surcursales en 5 Cuidades", () => {
            const buenosAires = new Provincia(3200);
            const neuquen = new Provincia(2000);
            const capitalFederal = new Ciudad(buenosAires);
            const bariloche = new Ciudad(neuquen);
            const laPlata = new Ciudad(buenosAires);
            const berazategui = new Ciudad(buenosAires);
            const ciudades = [
              bariloche,
              laPlata,
              bariloche,
              berazategui,
              neuquen,
              capitalFederal,
            ];
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
  describe("Realizando consultas", () => {
    describe("En el CENTRO DE DISTRIBUCIÓN", () => {
      it("El Se agrega un nuevo vendedor al centro de distribución", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const centroDeDistribucion = new CentroDeDistribucion(
          capitalFederal,
          []
        );
        const vendedor1 = new Vendedor();
        const certificacionP1 = new Certificacion(true, 1000);
        vendedor1.agregarCertificacion(certificacionP1);

        centroDeDistribucion.agregarVendedor(vendedor1);

        // assert.equal("El vendedor ya existe!", centroDeDistribucion.agregarVendedor(vendedor1));
        assert.equal(1, centroDeDistribucion.vendedores.length);
      });
      it("El intenta agregar un vendedor que ya existe --> Tiene que dar un error", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const centroDeDistribucion = new CentroDeDistribucion(
          capitalFederal,
          []
        );
        const vendedor1 = new Vendedor();
        const certificacionP1 = new Certificacion(true, 1000);
        vendedor1.agregarCertificacion(certificacionP1);

        centroDeDistribucion.agregarVendedor(vendedor1);

        assert.throws(() => {
          centroDeDistribucion.agregarVendedor(vendedor1);
        }, errores.ElVendedorYaExisteError);
      });

      it("El vendedor estrella es el que tiene mayor puntaje en certificaciones", () => {
        const vendedor1 = new Vendedor();
        const vendedor2 = new Vendedor();
        const vendedor3 = new Vendedor();

        const certificacionP1 = new Certificacion(true, 1000);
        const certificacionP2 = new Certificacion(true, 50);
        const certificacionP3 = new Certificacion(true, 5);
        const certificacionNP1 = new Certificacion(false, 120);
        const certificacionNP2 = new Certificacion(false, 220);
        const certificacionNP3 = new Certificacion(false, 220);

        vendedor1.agregarCertificacion(certificacionP1);
        vendedor1.agregarCertificacion(certificacionP2);
        vendedor1.agregarCertificacion(certificacionP3);
        vendedor1.agregarCertificacion(certificacionNP3);

        vendedor2.agregarCertificacion(certificacionP2);
        vendedor2.agregarCertificacion(certificacionP3);
        vendedor2.agregarCertificacion(certificacionNP1);
        vendedor2.agregarCertificacion(certificacionNP2);
        vendedor2.agregarCertificacion(certificacionNP3);

        vendedor3.agregarCertificacion(certificacionP1);
        vendedor3.agregarCertificacion(certificacionP2);

        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const centroDeDistribucion = new CentroDeDistribucion(
          capitalFederal,
          []
        );

        centroDeDistribucion.agregarVendedor(vendedor1);
        centroDeDistribucion.agregarVendedor(vendedor2);
        centroDeDistribucion.agregarVendedor(vendedor3);

        assert.equal(vendedor1, centroDeDistribucion.vendedorEstrella());
      });
      describe("Verificar si el Centro de distribución es ROBUSTO", () => {
        it("El Centro de distribución es robusto si 3 o más de sus venderores son firmes", () => {
          const vendedor1 = new Vendedor();
          const vendedor2 = new Vendedor();
          const vendedor3 = new Vendedor();
          const vendedor4 = new Vendedor();

          const certificacionP1 = new Certificacion(true, 1000);
          const certificacionP2 = new Certificacion(true, 50);
          const certificacionP3 = new Certificacion(true, 5);
          const certificacionNP1 = new Certificacion(false, 120);
          const certificacionNP2 = new Certificacion(false, 220);
          const certificacionNP3 = new Certificacion(false, 220);

          vendedor1.agregarCertificacion(certificacionP1);
          vendedor1.agregarCertificacion(certificacionP2);
          vendedor1.agregarCertificacion(certificacionP3);
          vendedor1.agregarCertificacion(certificacionNP3);

          vendedor2.agregarCertificacion(certificacionP2);
          vendedor2.agregarCertificacion(certificacionP3);
          vendedor2.agregarCertificacion(certificacionNP1);
          vendedor2.agregarCertificacion(certificacionNP2);
          vendedor2.agregarCertificacion(certificacionNP3);

          vendedor3.agregarCertificacion(certificacionP1);
          vendedor3.agregarCertificacion(certificacionP2);

          vendedor4.agregarCertificacion(certificacionP1);

          const buenosAires = new Provincia(3200);
          const capitalFederal = new Ciudad(buenosAires);
          const centroDeDistribucion = new CentroDeDistribucion(
            capitalFederal,
            []
          );

          centroDeDistribucion.agregarVendedor(vendedor1);
          centroDeDistribucion.agregarVendedor(vendedor2);
          centroDeDistribucion.agregarVendedor(vendedor3);
          centroDeDistribucion.agregarVendedor(vendedor4);

          assert.equal(true, centroDeDistribucion.esRobusto());
        });
        it("El Centro de distribución NO es robusto si menos de 3 de sus venderores son firmes", () => {
          const vendedor1 = new Vendedor();
          const vendedor2 = new Vendedor();
          const vendedor3 = new Vendedor();
          const vendedor4 = new Vendedor();

          const certificacionP1 = new Certificacion(true, 10);
          const certificacionP2 = new Certificacion(true, 50);
          const certificacionP3 = new Certificacion(true, 5);
          const certificacionNP1 = new Certificacion(false, 1);
          const certificacionNP2 = new Certificacion(false, 2);
          const certificacionNP3 = new Certificacion(false, 2);

          vendedor1.agregarCertificacion(certificacionP2);

          vendedor2.agregarCertificacion(certificacionP2);
          vendedor2.agregarCertificacion(certificacionP3);
          vendedor2.agregarCertificacion(certificacionNP1);
          vendedor2.agregarCertificacion(certificacionNP2);
          vendedor2.agregarCertificacion(certificacionNP3);

          vendedor3.agregarCertificacion(certificacionP1);

          vendedor4.agregarCertificacion(certificacionP1);

          const buenosAires = new Provincia(3200);
          const capitalFederal = new Ciudad(buenosAires);
          const centroDeDistribucion = new CentroDeDistribucion(
            capitalFederal,
            []
          );

          centroDeDistribucion.agregarVendedor(vendedor1);
          centroDeDistribucion.agregarVendedor(vendedor2);
          centroDeDistribucion.agregarVendedor(vendedor3);
          centroDeDistribucion.agregarVendedor(vendedor4);

          assert.equal(false, centroDeDistribucion.esRobusto());
        });
      });

      it("Listar la colección de vendedores genéricos", () => {
        const vendedor1 = new Vendedor();
        const vendedor2 = new Vendedor();
        const vendedor3 = new Vendedor();
        const vendedor4 = new Vendedor();

        const certificacionP1 = new Certificacion(true, 10);
        const certificacionP2 = new Certificacion(true, 50);
        const certificacionP3 = new Certificacion(true, 5);
        const certificacionNP1 = new Certificacion(false, 1);
        const certificacionNP2 = new Certificacion(false, 2);
        const certificacionNP3 = new Certificacion(false, 2);

        vendedor1.agregarCertificacion(certificacionP2);

        vendedor2.agregarCertificacion(certificacionP2);
        vendedor2.agregarCertificacion(certificacionP3);
        vendedor2.agregarCertificacion(certificacionNP1);
        vendedor2.agregarCertificacion(certificacionNP2);
        vendedor2.agregarCertificacion(certificacionNP3);

        vendedor3.agregarCertificacion(certificacionP1);

        vendedor4.agregarCertificacion(certificacionP1);

        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const centroDeDistribucion = new CentroDeDistribucion(
          capitalFederal,
          []
        );

        centroDeDistribucion.agregarVendedor(vendedor1);
        centroDeDistribucion.agregarVendedor(vendedor2);
        centroDeDistribucion.agregarVendedor(vendedor3);
        centroDeDistribucion.agregarVendedor(vendedor4);

        assert.deepEqual(
          [vendedor2],
          centroDeDistribucion.vendedoresGenericos()
        );
      });
      describe("Se verifica la cobertura de una Ciudad", () => {
        it("Se verifica si se puede cubrir la ciudad de Berazategui - Un vendedor tiene que poder vender ahí", () => {
          const buenosAires = new Provincia(3200);
          const capitalFederal = new Ciudad(buenosAires);
          const centroDeDistribucion = new CentroDeDistribucion(
            capitalFederal,
            []
          );
          const berazategui = new Ciudad(buenosAires);
          const vendedor1 = new VendedorFijo(berazategui);
          centroDeDistribucion.agregarVendedor(vendedor1);

          assert.equal(true, centroDeDistribucion.puedeCubir(berazategui));
        });
        it("Se verifica que NO se puede cubrir la ciudad de La Plata - porque no tiene un vendedor con esa ciudad", () => {
          const buenosAires = new Provincia(3200);
          const capitalFederal = new Ciudad(buenosAires);
          const laPlata = new Ciudad(buenosAires);
          const centroDeDistribucion = new CentroDeDistribucion(
            capitalFederal,
            []
          );
          const berazategui = new Ciudad(buenosAires);
          const vendedor1 = new VendedorFijo(berazategui);
          centroDeDistribucion.agregarVendedor(vendedor1);

          assert.equal(false, centroDeDistribucion.puedeCubir(laPlata));
        });
      });
    });
  });
});
