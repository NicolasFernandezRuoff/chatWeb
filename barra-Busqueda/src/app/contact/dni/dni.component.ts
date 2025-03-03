import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dni',
  standalone: false,
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css'] // Aquí también corregí styleUrl -> styleUrls
})
export class DniComponent implements OnChanges {

  formulariDocumento: FormGroup;
  // Ejemplo de objeto que viene de la base de datos
  usuarioActivo: any = {
    nombre: 'pedro',
    apellido: 'perez',
    email: 'hola1234@gmail.com'
  };

  @Input() tipoDni: string = 'DNI';

  // Validadores para formularios dinámicos
  constructor(private form: FormBuilder) {
    this.formulariDocumento = this.form.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes?.['tipoDni'].currentValue);
  }

  hasErrors(control: string, errorType: string) {
    return this.formulariDocumento.get(control)?.hasError(errorType) && this.formulariDocumento.get(control)?.touched;
  }
}
