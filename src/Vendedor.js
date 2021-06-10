var _ = require("lodash");

module.exports = class Vendedor {
  constructor() {
    this.certificaciones = [];
  }

  agregarCertificacion(certificacion) {
    this.certificaciones.push(certificacion);
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

  esVersatil = () => {
    return (
      this.certificaciones.length >= 3 &&
      this.certificacionesDeProducto() >= 1 &&
      this.otrasCertificaciones() >= 1
    );
  };

  esGenerico() {
    return this.otrasCertificaciones() >= 1;
  }

  esFirme() {
    return this.puntajeCertificaciones() >= 30;
  }
};
