import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private navcontroller: NavController) { }

  ngOnInit() {
  }

  login(){
    this.navcontroller.navigateRoot("login");
  }

}

