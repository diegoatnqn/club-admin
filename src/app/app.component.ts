import { Component, OnInit } from '@angular/core';
import { LoginService } from './login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-church';
  showLogin = true;
  miVar = "";
  
  constructor(public login: LoginService) {
   
  };

  ngOnInit(): void {
    this.miVar = this.login.logueado;
    window.onscroll = () => {this.mostrarBotonIrArriba() };
  }
  irLogin() {
    this.showLogin = false;
    window.scrollTo(0, 0);
  }
  mostrarBotonIrArriba() {
    const mybutton = document.getElementById("myBtn");
    if ((document.body.scrollTop > 155 || document.documentElement.scrollTop > 155)) {
      mybutton.style.display = 'block';
    };
    if ((document.body.scrollTop > 3850 || document.documentElement.scrollTop > 3850)) {
      mybutton.style.display = 'none';
    }
  }
  mostrarNavbar() {
    const myNav = document.getElementById("mainNav");
    if (document.body.scrollTop > 155 || document.documentElement.scrollTop > 155) {
      myNav.style.display = 'block';
    } else {
      myNav.style.display = 'none';
    }
}
  irArriba(){
    window.scrollTo(0, 0);
    console.log("Scroll a tope de pagina");
  }
}
