import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobranzaPageRoutingModule } from './cobranza-routing.module';

import { CobranzaPage } from './cobranza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobranzaPageRoutingModule
  ],
  declarations: [CobranzaPage]
})
export class CobranzaPageModule {}
