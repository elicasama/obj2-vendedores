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
    return this.certificaciones.reduce((suma, certificacion) => {
      const totalPuntaje = suma + certificacion.puntaje;
      return totalPuntaje;
    }, 0);
  }

  esUnVendedorGenerico() {
    return this.otrasCertificaciones() >= 1;
  }
};
