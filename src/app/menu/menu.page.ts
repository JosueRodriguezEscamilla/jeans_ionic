import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
isCobranza: boolean = false;
isVentas: boolean = false;
isClientes: boolean = false;
isNuevoCliente: boolean = false;
isMenu:Boolean = false;

nombre: any;
vendedor: any;
cliente: any;
clienteclave: any = "";
importe:any = 0;
response:any;
objetoResponseCli: any[] = [];
objetoResponseCob:any[]=[];
objetoCobSeleccionados:any[]=[];
num: any = 0;
 
chk: boolean = false;

  constructor(private navcontroller:NavController,
              private dataService:DataService,
              private loadingController:LoadingController) { }

  
 async ngOnInit() { 
    this.isCobranza = false;
    this.isVentas = false;
    this.isMenu = true;

    this.nombre = localStorage.getItem("JVE_NOMBRE")
    this.vendedor = localStorage.getItem("JVE_CLAVE")

    this.response = await this.dataService.returnClientes(this.vendedor,this.cliente);
    await this.response.forEach(element => {
        if(element.codigo > 0) {
          this.objetoResponseCli = element.ListaResultado;
        }
    });
    this.num = this.objetoResponseCli.length;
    
    this.clienteclave = this.objetoResponseCli[0].VCL_CLAVE;
  }
  ionViewWillEnter() {
    this.isCobranza = false;
    this.isVentas = false;
    this.isMenu = true;
  } 
  async Opciones(opc) {
    this.response = await this.dataService.returnCobranzaClientes(this.clienteclave);
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoResponseCob = element.ListaResultado;
      } 
    });
     this.num = this.objetoResponseCob.length;
     const loading = await this.loadingController.create({
       cssClass: 'my-custom-class',
       message: 'Cargando...', 
     });
     await loading.present();
    switch (opc) {
      case 1: 
      
    this.isCobranza = true;
    this.isVentas = false;
    this.isMenu = false;

    break;
      case 2:
        localStorage.setItem("VCL_CLAVE",this.clienteclave);
        this.navcontroller.navigateForward("/ventas"); 
        break;
      case 3:
        this.isMenu = true;
        this.isCobranza = false;
        this.isVentas = false;
      default:
        break;
    }
    loading.dismiss();
  }
  async ventas(){  
    if(this.clienteclave != undefined && this.clienteclave != "") { 
      localStorage.setItem("VCL_CLAVE",this.clienteclave);
      this.navcontroller.navigateForward("/ventas"); 
    }
  }
  async cobranza(){  
    if(this.clienteclave != undefined && this.clienteclave != "") { 
      localStorage.setItem("VCL_CLAVE",this.clienteclave);
      this.navcontroller.navigateForward("/cobranza"); 
    }
  }
  async corte(){  
    this.navcontroller.navigateForward("/corte"); 
  }
  async ventasRealizadas(){  
    this.navcontroller.navigateForward("/ventas-realizadas"); 
  }
  login(){
    this.navcontroller.navigateRoot("login");
  }

 async fieldsChange(result,folio,fecha) {
    debugger
    await this.objetoResponseCob.forEach(element => {
      if(folio == element.VVD_CLAVE && fecha == element.VVD_VENTA_FECH ){
        this.objetoCobSeleccionados.push(element);
      }
    });
    this.importe = result;
  }
}
