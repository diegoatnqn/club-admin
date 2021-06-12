import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';
import { Router } from '@angular/router';
import { NoticiasService } from '../noticias.service';
import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  unsatisfiedLogin: boolean;
  loggedInCorrect: boolean;
  tituloNoticia: string;
  descripcionNoticia: string;
  noticiasTabla: Array<any> = [];
  consultasTabla: Array<any> = [];
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
    unsatistiedNewPost: boolean;
    sessionExpired: boolean;
  constructor(public loginService: LoginService, public router: Router, public noticiasService: NoticiasService,
    public consultaService: ConsultasService
  ) { }

  ngOnInit(): void {
    this.unsatisfiedLogin = false;
    this.unsatistiedNewPost = false;
    this.loggedInCorrect = this.loginService.isLoggedIn();
    }

  login() {   //INICIAR SESION
    const user = { email: this.email, password: this.password };
    this.loginService.login(user).subscribe((data) => {
      if (data) {
        this.loggedInCorrect = true;                      //INICIO CORRECTO
        this.loginService.setSession(data);
        this.router.navigateByUrl('login');
        this.getNews();
        this.getConsultas();
      } else {  //Login falso
        this.unsatisfiedLogin = true;
        this.dismiss();
        this.email = "";
        this.password = "";
      }
    });
    
  }
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
  addNews() {
    if (this.loginService.isLoggedIn()) {
      const noticia = {                     //CREO LA NOTICIA
        titulo: this.tituloNoticia,
        cuerpo: this.descripcionNoticia,
        cover: this.cardImageBase64
      };
      this.noticiasService.crear(noticia).subscribe((data) => {   // Y ENVIO A SERVICIO
        console.log("DATA CREAR NOTICIA: " + data);
      });
      this.getNews();       //RESET de variables
      this.tituloNoticia = '';
      this.descripcionNoticia = '';
      this.cardImageBase64 = '';
      this.removeImage();
    } else {                    //Si no ha iniciado sesion
      this.logout();
      this.tituloNoticia = '';
      this.descripcionNoticia = '';
      this.cardImageBase64 = '';
      this.removeImage();
      this.sessionExpired = true;
      this.loggedInCorrect = false;
    }
  }
  dismiss() {
    setTimeout(() => {
      this.unsatistiedNewPost = false;
      this.unsatisfiedLogin = false;
      return true;
    }, 1200);    //saco cartel login erroneo
  }
  getNews() {
    this.noticiasService.obtener().subscribe((noticias) => {
      this.noticiasTabla = noticias["noticia"];
      this.noticiasTabla=this.noticiasTabla.reverse();
    })
    
  }
  deleteNews(id: any) {
    this.noticiasService.eliminar(id).subscribe(() => { console.log("Noticia ELIMINADA") });
    this.getNews();
  }

  getConsultas() {
    this.consultaService.getConsultas().subscribe((consultas) => {
      this.consultasTabla = consultas["consulta"];
      this.consultasTabla = this.consultasTabla.reverse();
    });
    
  };
  deleteConsultas(id: number) {
    this.consultaService.eliminar(id).subscribe(() => { console.log("Consulta eliminada") });
    this.getConsultas();
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 500;
      const max_width = 500;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
}
