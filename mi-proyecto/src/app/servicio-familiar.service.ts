import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFamiliarService {
  private hermanoGrande: string = '';
  private hermanoPequeno: string = '';

  getHermanoGrande(): string {
    return this.hermanoGrande;
  }

  setHermanoGrande(hermano: string): void {
    this.hermanoGrande = hermano;
  }

  getHermanoPequeno(): string {
    return this.hermanoPequeno;
  }

  setHermanoPequeno(hermano: string): void {
    this.hermanoPequeno = hermano;
  }

  saludar(hermano: string): void {
    console.log('Hola ' + hermano);
  }

  preguntarPorHijo(): string {
    return '¿Cómo estás, hijo?';
  }
}
