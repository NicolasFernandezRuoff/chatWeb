import { Component, OnInit } from '@angular/core';
import { ServicioFamiliarService } from '../servicio-familiar.service';
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';
import { NuevoPipePipe } from '../nuevo-pipe.pipe';

@Component({
  selector: 'app-hermano',
  imports: [EstiloHermanosDirective, NuevoPipePipe],
  templateUrl: './hermano.component.html',
  styleUrl: './hermano.component.css'
})
export class HermanoComponent implements OnInit {
  hermanoPequeno: string = '';

  constructor(private servicioFamiliar: ServicioFamiliarService) {}


  ngOnInit(): void {
    this.servicioFamiliar.setHermanoPequeno('Pedro');
    this.hermanoPequeno = this.servicioFamiliar.getHermanoPequeno();
  }

  saludar(): void {
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoGrande());
  }

  preguntar(): void {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }
}