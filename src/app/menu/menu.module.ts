import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localMX from '@angular/common/locales/fr';
registerLocaleData(localMX, 'fr');
import { MycurrencyPipe } from './custom.currencypipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, MycurrencyPipe],

  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'  
  }]
})
export class MenuPageModule {}
