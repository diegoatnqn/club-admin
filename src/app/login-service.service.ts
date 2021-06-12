import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
//import IUsuario from './backend/interfaces/usuario';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  logueado: string = "";
  constructor(private http: HttpClient) { }

  login(user: any) {
    // Esto solo anda con backend andando
    //return this.http.post<IUsuario>("/usuario/login", user);
  }

  public setSession(authResult) {
    var expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }   
}

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      console.log("INTERCEPTOR?: "+idToken);
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    else {
      console.log("INTERCEPTOR FALSE?: " + idToken);
      return next.handle(req);
    }
  }
}
