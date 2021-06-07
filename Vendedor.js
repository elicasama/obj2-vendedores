module.exports = class Vendedor {
    constructor(){
        this.certificaciones = [];
        
    }
    // en lugar de por constructor, no tendría que ser un estado? así después puedo manipularlo.

    puedeTrabajarEn(ciudad) {
        return pruedeTrabajarEn(ciudad);
    };

    // Vendedor.prototype.puedeTrabajarEn = function() {
    //     throw new Error("Implmentar la función");        
    // }

    esVersatil = () => {
        return this.certificaciones.length >= 3 && 
            this.certificacionesDeProducto() >= 1 &&
            this.otrasCertifiaciones() >= 1
    }

    agregarCertificacion(certificación) {
        this.certificaciones.push(certificación);
    }

    esFirme() {
        return this.puntajeCertifiaciones() >=30
    }

    // certificacionesDeProducto() {
    //     let totalPuntaje = 0;
    //     return this.certificaciones.reduce((totalPuntaje, certificacion ) => {
    //         return totalPuntaje + certificacion.puntaje;
    //     } 

    // };

}
