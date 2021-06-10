var _ = require("lodash");

module.exports = class Vendedor {
  constructor() {
    this.certificaciones = [];
  }

  esVersatil = () => {
    return (
      this.certificaciones.length >= 3 &&
      this.certificacionesDeProducto() >= 1 &&
      this.otrasCertificaciones() >= 1
    );
  };

  agregarCertificacion(certificación) {
    this.certificaciones.push(certificación);
  }

  esFirme() {
    return this.puntajeCertificaciones() >= 30;
  }

  certificacionesDeProducto() {
    return _.countBy(
      this.certificaciones,
      (certificacion) => certificacion.esDeProducto
    ).true;
  }

  otrasCertificaciones() {
    return _.countBy(
      this.certificaciones,
      (certificacion) => certificacion.esDeProducto
    ).false;
  }

  puntajeCertificaciones() {
    return _.sumBy(
      this.certificaciones,
      (certificacion) => certificacion.puntaje
    );
  }

  esUnVendedorGenerico() {
    return this.otrasCertificaciones() >= 1;
  }
};
