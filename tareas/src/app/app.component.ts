import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasServiceService } from './service/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
    listasTareas: string[] = [];
    nuevaTarea: string = '';

    private _tareas = inject(TareasServiceService); // Angular 16 / 17 

    ngOnInit() {
      this.listasTareas = this._tareas.getTareas();
    }

    agregarTarea() {
      this._tareas.agregarTarea(this.nuevaTarea);
      this.nuevaTarea = '';
      this.listasTareas = this._tareas.getTareas();
    }

    eliminarTarea(index: number) {
      this._tareas.eliminarTarea(index);
      this.listasTareas = this._tareas.getTareas();
    }

}
