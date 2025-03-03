import { Component, OnInit } from '@angular/core';
import { HijoComponent } from '../hijo/hijo.component'; 
import { ServicioFamiliarService } from '../servicio-familiar.service';
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';
import { NuevoPipePipe } from '../nuevo-pipe.pipe';
import { CommonModule } from '@angular/common'; // Necesario para pipes como date

@Component({
  selector: 'app-padre',
  standalone: true, // 🚨 Esto es lo más importante
  imports: [CommonModule, HijoComponent, EstiloHermanosDirective, NuevoPipePipe], 
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})
export class PadreComponent implements OnInit {
  // Contador
  valorContador: number = 0;
  fecha: Date = new Date(); // Esto usará el pipe | date en la plantilla

  incrementar() {
    this.valorContador++;
  }

  decrementar() {
    this.valorContador--;
  }

  // Recibir mensaje del hijo
  reciboMenaHijo ?: string;

  recibirMensaje(mensaje: string) {
    this.reciboMenaHijo = mensaje;
  }

  hermanoGrande: string = '';

  constructor(private servicioFamiliar: ServicioFamiliarService) {}

  ngOnInit(): void {
    this.servicioFamiliar.setHermanoGrande('Juan');
    this.hermanoGrande = this.servicioFamiliar.getHermanoGrande();
  }

  saludar(): void {
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoPequeno());
  }

  preguntar(): void {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }
}
