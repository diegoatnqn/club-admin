import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import INoticia from './backend/interfaces/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  crear(noticia: any) {
    return this.http.post<INoticia>('/noticia', noticia, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    });
  }
  obtener() {
    return this.http.get('/noticia/all');
  }
  eliminar(id: any) {
    return this.http.delete('/noticia/delete/' + id);
  }
}
