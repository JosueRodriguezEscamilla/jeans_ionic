import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';   
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit { 
  response: any;
  paquete: any = "";
  total: any = 0;

  tipoVenta: any = "PAQUETE";
  renglonPaquetes: any = 0;
  renglonIndividual: any = 0;

  objetoExistencias: any = [];
  objetoExistenciasInd: any = [];
  existencias: any = [];
  numeroExistencias: any = 0;
  objetoSeleccion: any = []; 
  objetoSeleccionInd: any = []; 

  isVenta: Boolean = false;
  isModal: Boolean = false;
  isPaquete: Boolean = false;
  isSelExistencias: Boolean = false;
  constructor(private navcontroller:NavController,
              private dataService:DataService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public modalController: ModalController) { }

  async ngOnInit() { 
    this.isVenta = true;
    this.isModal = false;

    this.response = await this.dataService.postRecuperaExistenciasPaq(localStorage.getItem("JVE_CLAVE")); 
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoExistencias = element.ListaResultado;
      } 
    });
    
    this.response = await this.dataService.postRecuperaExistenciasInd(localStorage.getItem("JVE_CLAVE")); 
    await this.response.forEach(element => {
      if(element.codigo > 0) {
        this.objetoExistenciasInd = element.ListaResultado;
      } 
    });
  }
  async buscar(articulo) {  
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando...', 
    });
    await loading.present();

    let ban = false;

    if(articulo == 0) {
        this.paquete = this.paquete;
    } else {
      this.paquete = articulo;
    }

    await this.objetoExistencias.forEach(async element => {
      ban = false;
      if(element.AAR_PA_FOLIO == this.paquete){
        await this.objetoSeleccion.forEach(ele => { 
          if(element.AAR_PA_FOLIO == ele.AAR_PA_FOLIO){
           ban = true;
          }
        }); 
        if(!ban) {
          let obj = {
            "AAR_CLAVE": element.AAR_CLAVE,
            "AAR_DESCRIPCION": element.AAR_DESCRIPCION,
            "AAR_PA_PRECIO": element.AAR_PA_PRECIO,
            "AAR_PA_FOLIO": element.AAR_PA_FOLIO
          }

          this.objetoSeleccion.push(obj);
          this.total = 0;
          await this.objetoSeleccion.forEach(ele => { 
            this.total = this.total + ele.AAR_PA_PRECIO; 
          });

          this.paquete = "";
          this.isVenta = true;
          this.isModal = false;
        }
      }  
    }); 
    loading.dismiss();
  }
  async guardar() {  
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...', 
    });
    await loading.present();
    
    if(this.objetoSeleccion.length < 1 && this.objetoSeleccionInd.length < 1) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'APD INFORMA',
        message: 'Debe seleccionar por lo menos un paquete para realizar la venta.',
        buttons: ['OK']
      });
  
      await alert.present();

      loading.dismiss();
      return;
    } 
    this.response = await this.dataService.postGuardaPaquetes(localStorage.getItem("JVE_CLAVE"),localStorage.getItem("VCL_CLAVE"),this.objetoSeleccion,this.objetoSeleccionInd);
    await this.response.forEach(async element => {
      if(element.codigo > 0) {
        this.response = await this.dataService.postRecuperaExistenciasPaq(localStorage.getItem("JVE_CLAVE")); 
        await this.response.forEach(element => {
          if(element.codigo > 0) {
            this.objetoExistencias = element.ListaResultado;
          } 
        });
        this.response = await this.dataService.postRecuperaExistenciasInd(localStorage.getItem("JVE_CLAVE")); 
        await this.response.forEach(element => {
          if(element.codigo > 0) {
            this.objetoExistenciasInd = element.ListaResultado;
          } 
        });
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'APD INFORMA',
          message: 'Venta realizada correctamente.',
          buttons: ['OK']
        });
    
        await alert.present();

        this.paquete = "";
        this.objetoSeleccion = [];
        this.objetoSeleccionInd = [];
        this.renglonPaquetes = 0;
        this.renglonIndividual = 0;
        this.total = 0;
        
        loading.dismiss();
        
      } else {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'APD INFORMA',
          message: 'Hubo un error al intentar realizar la venta, intentelo nuevamente.',
          buttons: ['OK']
        });
    
        await alert.present();

        loading.dismiss();
      }
    });
  }
  async presentModal() {
    this.isVenta = false;
    this.isModal = true;
    let ban = false;
 
    if(this.tipoVenta == "PAQUETE") {
      this.isPaquete = true;
      this.existencias = [];  
       this.objetoExistencias.forEach(async element => {
        ban = false;
        this.objetoSeleccion.forEach(async ele => {
          if(element.AAR_CLAVE == ele.AAR_CLAVE) {
            ban = true;
          }
        }); 
        if( !ban) {
          this.existencias.push(element);
        }
      });
      this.numeroExistencias = await 0;
      await this.existencias.forEach(element => {
        this.numeroExistencias = this.numeroExistencias + 1;
      }); 
    } else if("INDIVIDUAL") {
      this.isPaquete = false;
      this.existencias = [];  
       this.objetoExistenciasInd.forEach(async element => {
        ban = false;
        this.objetoSeleccionInd.forEach(async ele => {
          if(element.AAR_CLAVE == ele.AAR_CLAVE && element.JAI_TALLA == ele.JAI_TALLA && element.JAI_COLOR == ele.JAI_COLOR) {
            ban = true;
          }
        }); 
        if( !ban) {
          this.existencias.push(element);
        }
      });
      this.numeroExistencias = await 0;
      await this.existencias.forEach(element => {
        this.numeroExistencias = this.numeroExistencias + element.JAI_CANTIDAD;
      }); 
    }
  }
  async volver() {
    this.isVenta = true;
    this.isModal = false;
  }
  restablecer() {
    this.objetoSeleccion = [];
    this.objetoSeleccionInd = [];
    this.total = 0;
    this.renglonPaquetes = 0;
    this.renglonIndividual = 0;
  }
  async atras() {
    this.navcontroller.navigateBack("/menu");
  }
  async Checked(event,clave,talla,color) {
    debugger;
    if(this.isPaquete) {
      if(event.target.checked) {
        this.objetoExistencias.forEach(element => {
          if(element.AAR_PA_FOLIO == clave) { 
            let obj = {
              "RENGLON": this.renglonPaquetes,
              "AAR_CLAVE": element.AAR_CLAVE,
              "AAR_DESCRIPCION": element.AAR_DESCRIPCION,
              "AAR_PA_PRECIO": element.AAR_PA_PRECIO,
              "AAR_PA_FOLIO": element.AAR_PA_FOLIO,
              "AAR_PA_NUMERO_PIEZAS": element.AAR_PA_NUMERO_PIEZAS,
              "AAR_PRECIO_VENTA_FINAL": element.AAR_PRECIO_VENTA_FINAL
            }
            this.renglonPaquetes = this.renglonPaquetes + 1;
            this.objetoSeleccion.push(obj);
          }
        });
        this.total = 0;
        this.objetoSeleccion.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
        }); 
        this.objetoSeleccionInd.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_TOTAL);
        }); 
      } else { 
        for (var i = 0; i < this.objetoSeleccion.length; i++) {
          if(this.objetoSeleccion[i].AAR_PA_FOLIO == clave) {
            this.objetoSeleccion.splice(i, 1);
          }
        }
        this.total = 0;
        this.objetoSeleccion.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
        });  
        this.objetoSeleccionInd.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_TOTAL);
        }); 
      }
    } else {  
      if(event.target.checked) {
        this.objetoExistenciasInd.forEach(element => {
          if(element.AAR_CLAVE == clave && element.JAI_TALLA == talla && element.JAI_COLOR == color) {
            let obj = {
              "RENGLON": this.renglonIndividual,
              "AAR_CLAVE": element.AAR_CLAVE,
              "AAR_DESCRIPCION": element.AAR_DESCRIPCION,
              "AAR_PA_PRECIO": element.AAR_PRECIO_VENTA,
              "JAI_TALLA": element.JAI_TALLA,
              "JAI_COLOR": element.JAI_COLOR,
              "JAI_CANTIDAD": element.JAI_CANTIDAD,
              "AAR_TOTAL": (element.JAI_CANTIDAD * element.AAR_PRECIO_VENTA),
            }
            this.renglonIndividual = this.renglonIndividual + 1;
            this.objetoSeleccionInd.push(obj);
          }
        });
        this.total = 0;
        this.objetoSeleccion.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
        }); 
        this.objetoSeleccionInd.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_TOTAL);
        }); 
      } else { 
        for (var i = 0; i < this.objetoSeleccionInd.length; i++) {
          if(this.objetoSeleccionInd[i].AAR_CLAVE == clave && this.objetoSeleccionInd[i].JAI_TALLA == talla && this.objetoSeleccionInd[i].JAI_COLOR == color) {
            this.objetoSeleccionInd.splice(i, 1);
          }
        }
        this.total = 0;
        this.objetoSeleccion.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
        }); 
        this.objetoSeleccionInd.forEach(element => {
          this.total = this.total + parseFloat(element.AAR_TOTAL);
        });  
      }
    }
  }
  async modificarPaqCantidad(event,cantidad) { 
    var inputValue = event.target.value;
    this.objetoSeleccion[cantidad].AAR_PA_NUMERO_PIEZAS = inputValue;
    this.objetoSeleccion[cantidad].AAR_PA_PRECIO = this.objetoSeleccion[cantidad].AAR_PA_NUMERO_PIEZAS * this.objetoSeleccion[cantidad].AAR_PRECIO_VENTA_FINAL; 
    
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
    }); 
    this.objetoSeleccionInd.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_TOTAL);
    }); 
  }
  async modificarPaqPrecio(event,cantidad) {
    debugger;
    var inputValue = parseFloat(event.target.value.replace('$', ''));
    this.objetoSeleccion[cantidad].AAR_PRECIO_VENTA_FINAL = inputValue;
    this.objetoSeleccion[cantidad].AAR_PA_PRECIO = this.objetoSeleccion[cantidad].AAR_PA_NUMERO_PIEZAS * this.objetoSeleccion[cantidad].AAR_PRECIO_VENTA_FINAL; 
    
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
    }); 
    this.objetoSeleccionInd.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_TOTAL);
    }); 
  }
  async modificarIndCantidad(event,cantidad) {
    debugger;
    var inputValue = event.target.value;
    this.objetoSeleccionInd[cantidad].JAI_CANTIDAD = inputValue;
    this.objetoSeleccionInd[cantidad].AAR_TOTAL = this.objetoSeleccionInd[cantidad].JAI_CANTIDAD * this.objetoSeleccionInd[cantidad].AAR_PA_PRECIO; 
    
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
    }); 
    this.objetoSeleccionInd.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_TOTAL);
    }); 
  }
  async modificarIndPrecio(event,cantidad) {
    debugger;
    var inputValue = parseFloat(event.target.value.replace('$', ''));
    this.objetoSeleccionInd[cantidad].AAR_PA_PRECIO = inputValue;
    this.objetoSeleccionInd[cantidad].AAR_TOTAL = this.objetoSeleccionInd[cantidad].JAI_CANTIDAD * this.objetoSeleccionInd[cantidad].AAR_PA_PRECIO; 
    
    this.total = 0;
    this.objetoSeleccion.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_PA_PRECIO);
    }); 
    this.objetoSeleccionInd.forEach(element => {
      this.total = this.total + parseFloat(element.AAR_TOTAL);
    }); 
  }
  async desglozarPaquetes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Se descompondrá los paquetes seleccionados en piezas individuales, ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { 
          }
        }, {
          text: 'Aceptar',
          handler: async () => { 
            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Procesando...', 
            });
            await loading.present();
            debugger;
            this.objetoSeleccion.forEach(async element => {
              this.response = await this.dataService.postDesglozarPaquete(element.AAR_PA_FOLIO,localStorage.getItem("JVE_CLAVE")); 
              await this.response.forEach(async element => {
                if(element.codigo > 0) { 
                  await this.presentModal();
                }
              });
            });
              
            this.response = await this.dataService.postRecuperaExistenciasPaq(localStorage.getItem("JVE_CLAVE")); 
            await this.response.forEach(element => {
              if(element.codigo > 0) {
                this.objetoExistencias = element.ListaResultado;
              } 
            }); 
            this.response = await this.dataService.postRecuperaExistenciasInd(localStorage.getItem("JVE_CLAVE")); 
            await this.response.forEach(element => {
              if(element.codigo > 0) {
                this.objetoExistenciasInd = element.ListaResultado;
              } 
            });
            await this.presentModal();
            this.objetoSeleccion = [];
            this.objetoSeleccionInd = [];
            this.total = 0;
            this.renglonPaquetes = 0;
            this.renglonIndividual = 0;
            
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'CORRECTO',
              message: 'Paquetes desglozados correctamente.',
              buttons: ['OK']
            });
        
            await alert.present();

            loading.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }
}
