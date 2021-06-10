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
  describe(" Según la ciudad en la que quieren trabajar", () => {
    describe("Vendedor Fijo", () => {
      it("Puede trabajar en Capital Federal si su ciudadOrigen = capitalFederal", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(true, vendedorFijo.puedeTrabajarEn(capitalFederal));
      });
      it("No puede trabajar en Capital Federal si su ciudadOrigen = laPlata", () => {
        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const laPlata = new Ciudad(buenosAires);
        const vendedorFijo = new VendedorFijo(capitalFederal);
        assert.equal(false, vendedorFijo.puedeTrabajarEn(laPlata));
      });
    });
    describe("Viajante", () => {
      it("Puede trabajar en Capital Federal si está habilitado Buenos Aires", () => {
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
      it("No puede trabajar en Bariloche si no está habilitado en Neuquén ", () => {
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
    describe("COMERCIO CORRESPONSAL", () => {
      it("Puede trabajar en la Capital Federal si tiene sucursales en esa ciudad", () => {
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
      it("No puede trabajar en Capital Federal si no tiene sucursales esa ciudad", () => {
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
  describe("Cómo es un vendedor", () => {
    describe("Es versátil?", () => {
      it("Sí: con 3 o más certficaciones y al menos 1 es de productos y 1 no lo es", () => {
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
      it("No: con menos de 3 certficaciones aunque tengan 1 de productos y 1 que no lo es", () => {
        const vendedor = new Vendedor();
        const certificacionP1 = new Certificacion(true, 10); // Es de producto
        const certificacionNP1 = new Certificacion(false, 20); // No es de producto
        vendedor.agregarCertificacion(certificacionP1);
        vendedor.agregarCertificacion(certificacionNP1);
        assert.equal(false, vendedor.esVersatil());
      });
      it("No: con 3 certficaciones o más si no tiene aunque sea 1 que sea de poductos", () => {
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
      it("No: con tiene 3 certficaciones o más si no tiene aunque sea 1 que no sea de productos", () => {
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
    describe("Es firme?", () => {
      it("Sí: con un puntaje > = 30 en el total de sus certificaciones", () => {
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
      it("No: con un puntaje <= 30 en el total de sus certificaciones", () => {
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

    describe("Es influyente?", () => {
      describe("Vendedor fijo", () => {
        it("Ningún Vendedor Fijo es influyente", () => {
          const vendedorFijo = new VendedorFijo();
          assert.equal(false, vendedorFijo.esInfluyente());
        });
      });
      describe("Viajante", () => {
        it("Sí: con la suma total de todas las personas de las provincias habilitadas >= 10000000 (10Millones)", () => {
          const buenosAires = new Provincia(13200);
          const santaFe = new Provincia(600800);
          const neuquen = new Provincia(20000000);
          const provinciasHabilitadas = [buenosAires, santaFe, neuquen];
          const viajante = new Viajante(provinciasHabilitadas);
          assert.equal(true, viajante.esInfluyente());
        });
        it("No: con la suma total de todas las personas de las provincias habilitadas < 10000000 (10Millones)", () => {
          const buenosAires = new Provincia(132);
          const santaFe = new Provincia(600);
          const neuquen = new Provincia(200);
          const provinciasHabilitadas = [buenosAires, santaFe, neuquen];
          const viajante = new Viajante(provinciasHabilitadas);
          assert.equal(false, viajante.esInfluyente());
        });
      });

      describe("Comercio corresponsal", () => {
        describe("Si tiene sucursales en 5 cuidades o sucursales en 3 provincias", () => {
          it("Sí: Tiene surcursales en 5 Cuidades", () => {
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
          it("Sí: Está en tres provincias (aunque no tenga 5 ciudades)", () => {
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
          it("No: No está en 5 ciudades ni en 3 provincias", () => {
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
  describe("Consultas / acciones varias", () => {
    describe("Centro de distribución", () => {
      it("Agregar nuevo vendedor", () => {
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

        assert.equal(1, centroDeDistribucion.vendedores.length);
      });
      it("Indicar que un vendedor ya existe y no agregarlo", () => {
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

      it("Indicar el vendedor estrella (mayor puntaje en certificaciones)", () => {
        const vendedor1 = new Vendedor();
        const vendedor2 = new Vendedor();
        const vendedor3 = new Vendedor();

        const certificacionP1 = new Certificacion(true, 1000);
        const certificacionP2 = new Certificacion(true, 50);
        const certificacionP3 = new Certificacion(true, 5);

        const certificacionNP1 = new Certificacion(false, 120);
        const certificacionNP2 = new Certificacion(false, 220);
        const certificacionNP3 = new Certificacion(false, 220);

        vendedor1.agregarCertificacion(certificacionP2);
        vendedor1.agregarCertificacion(certificacionP3);
        vendedor1.agregarCertificacion(certificacionNP1);
        vendedor1.agregarCertificacion(certificacionNP2);
        vendedor1.agregarCertificacion(certificacionNP3);

        vendedor2.agregarCertificacion(certificacionP1);
        vendedor2.agregarCertificacion(certificacionP2);
        vendedor2.agregarCertificacion(certificacionP3);
        vendedor2.agregarCertificacion(certificacionNP3);

        vendedor3.agregarCertificacion(certificacionP1);
        vendedor3.agregarCertificacion(certificacionP2);

        const buenosAires = new Provincia(3200);
        const capitalFederal = new Ciudad(buenosAires);
        const centroDeDistribucion = new CentroDeDistribucion(
          capitalFederal,
          []
        );

        centroDeDistribucion.agregarVendedor(vendedor1); // total certifaciones: 615
        centroDeDistribucion.agregarVendedor(vendedor2); // total certificaciones: 1275
        centroDeDistribucion.agregarVendedor(vendedor3); // total certificaciones: 1050

        assert.equal(vendedor2, centroDeDistribucion.vendedorEstrella());
      });
      describe("Es robusto?", () => {
        it("Sí: con 3 o más venderores firmes", () => {
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

          centroDeDistribucion.agregarVendedor(vendedor1); // puntaje 1275 -> Firme
          centroDeDistribucion.agregarVendedor(vendedor2); // puntaje 615 -> Firme
          centroDeDistribucion.agregarVendedor(vendedor3); // puntaje 1050 -> Firme
          centroDeDistribucion.agregarVendedor(vendedor4); // puntaje 1000 -> Firme
         

          assert.equal(true, centroDeDistribucion.esRobusto());
        });
        it("No: con menos de 3 venderores firmes", () => {
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

          centroDeDistribucion.agregarVendedor(vendedor1); // puntaje 50 -> Firme
          centroDeDistribucion.agregarVendedor(vendedor2); // puntaje 60 -> Firme
          centroDeDistribucion.agregarVendedor(vendedor3); // puntaje 10
          centroDeDistribucion.agregarVendedor(vendedor4); // puntaje 10

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
        vendedor2.agregarCertificacion(certificacionNP2); // lo hace genérico
        vendedor2.agregarCertificacion(certificacionNP3); // lo hace genérico

        vendedor3.agregarCertificacion(certificacionP1);
        vendedor3.agregarCertificacion(certificacionNP3); // lo hace genérico

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
          [vendedor2, vendedor3],
          centroDeDistribucion.vendedoresGenericos()
        );
      });
      describe("Cobertura de una Ciudad", () => {
        it("Se puede cubrir la ciudad de Berazategui si un vendedor puede vender ahí", () => {
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
        it("No se puede cubrir la ciudad de La Plata si ningún vendedor puede vender ahí", () => {
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
