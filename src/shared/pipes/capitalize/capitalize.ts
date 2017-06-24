import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Convierte la primera letra de un string en mayúscula.
   * Ej.: {{ ionic | capitalize }} = Ionic
   */
  transform(value: string, args?: any): any {
    if (value) {
            value.toLowerCase();
            return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}
