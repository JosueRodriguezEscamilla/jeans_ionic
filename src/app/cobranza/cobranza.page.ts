import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular'; 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cobranza',
  templateUrl: './cobranza.page.html',
  styleUrls: ['./cobranza.page.scss'],
})
export class CobranzaPage implements OnInit {
  response:any;
  objetoResponseCob:any=[];
  responseCorrecto: any;

  importe: any = "0";
  pagar: any = "";
  seleccion: any = [];
  pagarNumber: any;
  importeNumber: any;

  constructor(private navcontroller:NavController,
              private dataService:DataService,
              private loadingController:LoadingController,
              public alertController: AlertController) { }

  async ngOnInit() {
    this.response = await this.dataService.returnCobranzaClientes(localStorage.getItem("VCL_CLAVE"));
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoResponseCob = element.ListaResultado;
      } 
    });
  }
  async Checked(event,clave) {
    
    if(event.target.checked) {
      this.objetoResponseCob.forEach(element => {
        if(element.VVD_CLAVE == clave) {
          this.seleccion.push(element);
        }
      });
      this.importe = 0;
      this.seleccion.forEach(element => {
        this.importe = this.importe + parseFloat(element.VVD_IMPORTE_VENTA_TOTAL);
      });
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', 
      });
      
      this.importeNumber = this.importe;
      this.importe = formatter.format(this.importe);
    } else {
      
      for (var i = 0; i < this.seleccion.length; i++) {
        if(this.seleccion[i].VVD_CLAVE == clave) {
          this.seleccion.splice(i, 1);
        }
      }
      this.importe = 0;
      this.seleccion.forEach(element => {
        this.importe = this.importe + parseFloat(element.VVD_IMPORTE_VENTA_TOTAL);
      });
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', 
      });
      
      this.importeNumber = this.importe;
      this.importe = formatter.format(this.importe);

    }
  }
  async cobrar() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...', 
    });
    await loading.present();

    if(this.seleccion.length < 1) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'APD INFORMA',
        message: 'Debe seleccionar por lo menos una venta para realizar la cobranza.',
        buttons: ['OK']
      });
  
      await alert.present();

      loading.dismiss();
      return;
    } 

    if(this.pagar == "" || this.pagar == undefined) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'APD INFORMA',
        message: 'Debes capturar importe a pagar.',
        buttons: ['OK']
      });
  
      await alert.present();

      loading.dismiss();
      return;
    } 
    this.pagarNumber = parseFloat(this.pagar);
    if(this.pagarNumber > this.importeNumber) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'APD INFORMA',
        message: 'Lo pagado no puede ser mayor al importe de las ventas, revise la información.',
        buttons: ['OK']
      });
  
      await alert.present();

      loading.dismiss();
      return;
    }

    this.response = await this.dataService.postCobraCobranza(this.pagar,localStorage.getItem("VCL_CLAVE"),this.seleccion);
    this.response.forEach(async element => {
      if(element.codigo > 0) {
        this.responseCorrecto = await this.dataService.returnCobranzaClientes(localStorage.getItem("VCL_CLAVE"));
        await this.responseCorrecto.forEach(elw => {
          if(elw.codigo > 0) {
            this.objetoResponseCob = elw.ListaResultado;
          } 
        });
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'APD INFORMA',
          message: 'Cobranza realizada correctamente.',
          buttons: ['OK']
        }); 
        await alert.present();

        this.pagar = "";
        this.importe = "";
        this.seleccion = [];

        loading.dismiss();
      } else {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'APD INFORMA',
          message: 'Hubo un error al intentar ralizar la cobranza, intentelo nuevamente.',
          buttons: ['OK']
        });
    
        await alert.present();

        loading.dismiss();
      }
    });
  }
  async atras() {
    this.navcontroller.navigateBack("/menu");
  }
}
