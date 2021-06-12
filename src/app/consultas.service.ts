import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  crear(nueva:any) {
    return this.http.post('/send', nueva);
  }

  getConsultas() {
    return this.http.get("/send/revisar");
  }
  eliminar(id: number) {
    return this.http.delete("/send/delete/" + id);
  }
}
