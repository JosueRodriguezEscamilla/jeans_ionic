import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ventas-realizadas',
  templateUrl: './ventas-realizadas.page.html',
  styleUrls: ['./ventas-realizadas.page.scss'],
})
export class VentasRealizadasPage implements OnInit {
  FCH_INICIO: any;
  FCH_FIN: any;
  
  response: any;
  objetoSeleccion: any = [];
  objetoDesgloce: any = [];
  constructor(private navcontroller:NavController,
              private dataService:DataService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public modalController: ModalController) { }

  async ngOnInit() {
    debugger;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando', 
    });
    await loading.present();

    this.FCH_INICIO = moment().format('YYYY-MM-DD');
    this.FCH_FIN = moment().format('YYYY-MM-DD');

    this.response = await this.dataService.postRecuperaVentasTotal(localStorage.getItem("JVE_CLAVE"),this.FCH_INICIO,this.FCH_FIN);
    await this.response.forEach(element => {
        if(element.codigo == 1) {
          this.objetoSeleccion = element.ListaResultado;
        }
    });
    this.response = await this.dataService.postRecuperaVentasDesgloce(localStorage.getItem("JVE_CLAVE"),this.FCH_INICIO,this.FCH_FIN);
    await this.response.forEach(element => {
        if(element.codigo == 1) {
          this.objetoDesgloce = element.ListaResultado;
        }
    });
    loading.dismiss();
  }
  async Buscar() { 
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando', 
    });
    await loading.present();

    this.response = await this.dataService.postRecuperaVentasTotal(localStorage.getItem("JVE_CLAVE"),this.FCH_INICIO,this.FCH_FIN);
    await this.response.forEach(element => {
        if(element.codigo == 1) {
          this.objetoSeleccion = element.ListaResultado;
        }
    });
    this.response = await this.dataService.postRecuperaVentasDesgloce(localStorage.getItem("JVE_CLAVE"),this.FCH_INICIO,this.FCH_FIN);
    await this.response.forEach(element => {
        if(element.codigo == 1) {
          this.objetoDesgloce = element.ListaResultado;
        }
    });
    loading.dismiss();
  }
  async atras() {
    this.navcontroller.navigateBack("/menu");
  }
}
