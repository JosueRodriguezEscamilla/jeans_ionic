import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular'; 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.page.html',
  styleUrls: ['./corte.page.scss'],
})
export class CortePage implements OnInit {
  response:any;
  objetoSeleccion:any=[];
  total: Number = 0;

  constructor(private navcontroller:NavController,
              private dataService:DataService,
              private loadingController:LoadingController,
              public alertController: AlertController) { }

  async ngOnInit() { 
    this.response = await this.dataService.postRecuperaPreCorte(localStorage.getItem("JVE_CLAVE"));
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoSeleccion = element.ListaResultado;
      } 
    });
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total += element.CCC_IMPORTE_COBRADO; 
    });
  } 
  async actualizar() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando...' 
    });
    await loading.present();
 
    this.response = await this.dataService.postRecuperaPreCorte(localStorage.getItem("JVE_CLAVE"));
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoSeleccion = element.ListaResultado;
      } 
    });
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total += element.CCC_IMPORTE_COBRADO; 
    });

    loading.dismiss();
  }
  async atras() {
    this.navcontroller.navigateBack("/menu");
  }
}
