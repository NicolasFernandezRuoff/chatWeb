import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-hijo',
  imports: [FormsModule],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {
  // @Input() recibeHijo ?: string ;
  @Output() enviarMensaje = new EventEmitter<string>();
  @Output() incrementarHijo = new EventEmitter<void>();
  @Output() decrementarHijo = new EventEmitter<void>();
  
  mensajeHijo: string = '';

  enviarMensajeDedeHijo() {
    this.enviarMensaje.emit(this.mensajeHijo);
  }

  incrementar(){
    this.incrementarHijo.emit();
  }

  decrementar(){
    this.decrementarHijo.emit();
  }
}
