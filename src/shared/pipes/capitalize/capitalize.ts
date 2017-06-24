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
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args?: any): any {
    if (value) {
            value.toLowerCase();
            return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}
