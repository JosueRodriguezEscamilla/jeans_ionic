import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //  dominio = 'https://localhost:44304/api';
   //dominio = 'https://elevenjeans.mx/api';
   //dominio = 'http://189.244.137.223/APDJeans/api'; 

   //dominio='elevenjeans.ddns.net/APDJeans/api'
   //dominio='189.244.142.130/APDJeans/api'
   dominio ='http://elevenjeans.ddns.net/APDJeans/api'
  

  constructor(private http: HttpClient) { }

  async postUsuariosLogin(JVE_USUARIO,JVE_PASSWORD) {
    debugger;
    const data = {
      JVE_USUARIO: JVE_USUARIO,
      JVE_PASSWORD: JVE_PASSWORD
    };

    const url = this.dominio + '/Vendedores/Login';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    
      return await this.http.post(url, await data, await httpOptions).pipe();
   
  } 

  async returnClientes(JVE_CLAVE,VCL_CLAVE) {
    const data = {
      JVE_CLAVE: JVE_CLAVE,
      VCL_CLAVE: VCL_CLAVE
    };

    const url = this.dominio + '/Clientes/RecuperaClientes';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  // COBRANZA ==============================================================
  async returnCobranzaClientes(VCL_CLAVE) {
    const data = {
      VCL_CLAVE: VCL_CLAVE
    };

    const url = this.dominio + '/Cobranza/ReturnCobranza';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postCobraCobranza(PAGAR,VCL_CLAVE,SELECCION) {
    const data = {
      PAGAR: PAGAR,
      VCL_CLAVE: VCL_CLAVE,
      SELECCION: SELECCION
    };

    const url = this.dominio + '/Cobranza/CobrarConbranza';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  // VENTAS ================================================================
  async postRecuperaExistenciasPaq(JVE_CLAVE) {
    const data = {
      JVE_CLAVE: JVE_CLAVE
    };

    const url = this.dominio + '/Ventas/RecuperaExistenciasPaq';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postDesglozarPaquete(AAR_PA_FOLIO,JVE_CLAVE) {
    const data = {
      AAR_PA_FOLIO: AAR_PA_FOLIO,
      JVE_CLAVE: JVE_CLAVE
    };
    
    const url = this.dominio + '/Ventas/DesglozarPaquete';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postRecuperaExistenciasInd(JVE_CLAVE) {
    const data = {
      JVE_CLAVE: JVE_CLAVE
    };

    const url = this.dominio + '/Ventas/RecuperaExistenciasInd';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postGuardaPaquetes(JVE_CLAVE,JCL_CLAVE,OBJ_PAQUETES,OBJ_INDIVIDUAL) {
    const data = {
      JVE_CLAVE: JVE_CLAVE,
      JCL_CLAVE: JCL_CLAVE,
      OBJ_PAQUETES: OBJ_PAQUETES,
      OBJ_INDIVIDUAL: OBJ_INDIVIDUAL
    };

    const url = this.dominio + '/Ventas/GuardaVenta';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  // PRE CORTE ============================================================
  async postRecuperaPreCorte(JVE_CLAVE) {
    const data = {
      JVE_CLAVE: JVE_CLAVE
    };

    const url = this.dominio + '/Corte/RecuperaCorte';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  // VENTAS REALIZADAS ====================================================
  async postRecuperaVentasTotal(JVE_CLAVE, FCH_INICIO, FCH_FIN) {
    const data = {
      JVE_CLAVE: JVE_CLAVE,
      FCH_INICIO: FCH_INICIO,
      FCH_FIN: FCH_FIN
    };

    const url = this.dominio + '/VentasDiarias/RecuperaVentasTotal';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postRecuperaVentasDesgloce(JVE_CLAVE, FCH_INICIO, FCH_FIN) {
    const data = {
      JVE_CLAVE: JVE_CLAVE,
      FCH_INICIO: FCH_INICIO,
      FCH_FIN: FCH_FIN
    };

    const url = this.dominio + '/VentasDiarias/RecuperaVentasDesgloce';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async postRecuperaVentasRalizadas(JVE_CLAVE) {
    const data = {
      JVE_CLAVE: JVE_CLAVE
    };

    const url = this.dominio + '/Corte/RecuperaCorte';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
}
