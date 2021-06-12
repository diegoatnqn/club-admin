
import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../consultas.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formOpen: boolean;
  nombre: string;
  email: string;
  descripcion: string;
  motivo: string;
    contactoCorrecto: boolean;
  constructor(private contactar: ConsultasService) {  }
  ngOnInit(): void {
    this.contactoCorrecto = false;
    this.formOpen = false;
   
  }
  toggleForm() {
    this.formOpen = !this.formOpen;
  }
  crearConsulta() {
    const consulta = { nombre: this.nombre, email: this.email, motivo: this.motivo, descripcion: this.descripcion };
    this.contactar.crear(consulta).subscribe(() => {
      this.toggleForm();
      this.contactoCorrecto = true;
    });
    this.nombre = "";
    this.descripcion = "";
    this.email = "";
    this.dismiss();
    
  }
  dismiss() {
    setTimeout(() => {
      return this.contactoCorrecto = false
    }, 1500);
  }
}
