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
    const certificadosDeProducto = this.certificaciones.filter(
      (certificacion) => certificacion.esDeProducto
    );
    return certificadosDeProducto.length;
  }

  otrasCertificaciones() {
    const otrosCertificados = this.certificaciones.filter(
      (certificacion) => !certificacion.esDeProducto
    );
    return otrosCertificados.length;
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
