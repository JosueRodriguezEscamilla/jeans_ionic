import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController,AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  JVE_USUARIO: any;
  JVE_PASSWORD :any;
  response: any
  constructor(private navcontroller:NavController,
              private loadingController:LoadingController,
              private alertController:AlertController,
              private dataService:DataService) { }

  ngOnInit() {
  }

  async usuariosLogin() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...' 
    });
    await loading.present();

    try {
      debugger;
      this.response = await this.dataService.postUsuariosLogin(this.JVE_USUARIO.toUpperCase().trim(), this.JVE_PASSWORD); 
      await this.response.forEach(async element => {
          if(element.codigo > 0) { 
            if(element.ListaResultado.length > 0) { 
            localStorage.setItem("JVE_CLAVE",element.ListaResultado[0].JVE_CLAVE);
            localStorage.setItem("JVE_FECALTA",element.ListaResultado[0].JVE_FECALTA);
            localStorage.setItem("JAL_CLAVE",element.ListaResultado[0].JAL_CLAVE);
            localStorage.setItem("JVE_NOMBRE",element.ListaResultado[0].JVE_NOMBRE);
            localStorage.setItem("JVE_DESCUENTO_AUTORIZADO",element.ListaResultado[0].JVE_DESCUENTO_AUTORIZADO);
            localStorage.setItem("JVE_PORCENTAJE_COMISION",element.ListaResultado[0].JVE_PORCENTAJE_COMISION);
            localStorage.setItem("JVE_ABREVIACION",element.ListaResultado[0].JVE_ABREVIACION);
            localStorage.setItem("JVE_NOTAS",element.ListaResultado[0].JVE_NOTAS);
            localStorage.setItem("CEM_CLAVE",element.ListaResultado[0].CEM_CLAVE);
            localStorage.setItem("CET_NOMBRE",element.ListaResultado[0].CET_NOMBRE);
            localStorage.setItem("JVE_MOSTRAR",element.ListaResultado[0].JVE_MOSTRAR);
            localStorage.setItem("JVE_FUM",element.ListaResultado[0].JVE_FUM);

            
            this.navcontroller.navigateRoot("menu");
            loading.dismiss();
            } else {
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Advertencia', 
                message: 'Usuario o contraseña equivocada, revise la información ingresada.',
                buttons: ['Aceptar']
              });
          
              await alert.present(); 
              loading.dismiss();
            }
          } else {
           const alert = await this.alertController.create({
             cssClass: 'my-custom-class',
             header: 'Advertencia', 
             message: element.mensaje,
             buttons: ['Aceptar']
           });
       
           await alert.present(); 
           loading.dismiss();
          }
      });
    } catch (error) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error', 
        message: 'Error al conectar con el servidor, intentelo nuevamente',
        buttons: ['Aceptar']
      });
  
      await alert.present(); 
      loading.dismiss();
    }
  }
  recupera(){
    this.navcontroller.navigateRoot("recupera");
  }
  regresar(){
    this.navcontroller.navigateBack("/")
  }
}
