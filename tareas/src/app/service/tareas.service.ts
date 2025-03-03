import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasServiceService {

  private localSotrageKey = 'tareas';

  getTareas() {
    return JSON.parse(localStorage.getItem(this.localSotrageKey)as string )  || [];
  }

  agregarTarea(tarea: string) {
    const tareas = this.getTareas();
    tareas.push(tarea);
    localStorage.setItem(this.localSotrageKey, JSON.stringify(tareas));
  }

  eliminarTarea(index: number) {
    const tareas = this.getTareas();
    tareas.splice(index, 1);
    localStorage.setItem(this.localSotrageKey, JSON.stringify(tareas));
  }

  constructor() { }
}
