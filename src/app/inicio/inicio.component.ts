import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  menus: Array<string>;
  constructor(public route: Router) {
    this.menus = ["Nosotros", "Actividades", "Noticias", "Contacto"];
  }

  ngOnInit(): void {
  }
  
}
