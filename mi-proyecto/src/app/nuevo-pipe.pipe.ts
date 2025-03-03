import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuevoPipe'
})
export class NuevoPipePipe implements PipeTransform {

  transform(valor: string | undefined): string {
    return valor?.toUpperCase() || '';
  }

}
