import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy{

    //Formulario estatico
    // public usuario: any = {
    //   nombre: '',
    //   email: ''
    // }

    // enviar() {
    //   console.log(this.usuario);
    // }
  

    //Formualrio dinamico
    formularioContacto: FormGroup
    //Ejemplo de objeto esto tiene quie venir de la base de datos de de un servicio
    usuarioActivo: any = {
      nombre: 'pedro',
      apellido: 'perez',
      email: 'hola1234@gmail.com'
    }

    tipoDni : string = 'DNI';

    //Validadores para formularios dinamicos muy importante
    constructor(private form : FormBuilder) {
      this.formularioContacto = this.form.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        tipoDni: [''],
        email: ['', [Validators.required, Validators.email]],
      })
    }

    enviar(){
      console.log(this.formularioContacto);
    }
 
    // ngOnInit() se uriliza para inicializar el componente setroando valores por defecto o generalmente para susvibirce a eventos
    ngOnInit(): void {
      // this.formularioContacto.patchValue({
      //   nombre: this.usuarioActivo.nombre,
      // })
      // this.formularioContacto.get('nombre')?.disable();

      this.formularioContacto?.valueChanges.subscribe((valor) => {
        console.log(valor)
      });

      this.formularioContacto?.get('tipoDni')?.valueChanges.subscribe((valor) => {
        this.tipoDni = valor;
      });
    }

    // ngOnDestroy() se utiliza para desuscribirse de eventos o liberar recursos
    ngOnDestroy(): void {
      console.log('onDestroy');
    }


    hasErrors(control: string, errorType: string) {
      return this.formularioContacto.get(control)?.hasError(errorType) && this.formularioContacto.get(control)?.touched;
    }
}
