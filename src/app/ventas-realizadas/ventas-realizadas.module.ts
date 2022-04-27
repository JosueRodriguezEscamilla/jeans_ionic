import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentasRealizadasPageRoutingModule } from './ventas-realizadas-routing.module';

import { VentasRealizadasPage } from './ventas-realizadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentasRealizadasPageRoutingModule
  ],
  declarations: [VentasRealizadasPage]
})
export class VentasRealizadasPageModule {}
