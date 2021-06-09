module.exports = class Vendedor {
  constructor() {
    this.certificaciones = [];
  }

  esVersatil = () => {
    return (
      this.certificaciones.length >= 3 &&
      this.certificacionesDeProducto() >= 1 &&
      this.otrasCertifiaciones() >= 1
    );
  };

  agregarCertificacion(certificación) {
    this.certificaciones.push(certificación);
  }

  esFirme() {
    return this.puntajeCertifiaciones() >= 30;
  }

  certificacionesDeProducto() {
    let totalPuntaje = 0;
    return this.certificaciones.reduce((totalPuntaje, certificacion ) => {
        return totalPuntaje + certificacion.puntaje;
    })

  };
};
