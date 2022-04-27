import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasRealizadasPage } from './ventas-realizadas.page';

const routes: Routes = [
  {
    path: '',
    component: VentasRealizadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRealizadasPageRoutingModule {}
