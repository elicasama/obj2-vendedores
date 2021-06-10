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
    const certificadosDeProducto = this.certificaciones.filter(
      (certificacion) => certificacion.esDeProducto
    );
    return certificadosDeProducto.length;
  }

  otrasCertifiaciones() {
    const otrosCertificados = this.certificaciones.filter(
      (certificacion) => !certificacion.esDeProducto
    );
    return otrosCertificados.length;
  }

  puntajeCertifiaciones() {
    return this.certificaciones.reduce((suma, certificacion) => {
      const totalPuntaje = suma + certificacion.puntaje;
      return totalPuntaje;
    }, 0);
  }
};
