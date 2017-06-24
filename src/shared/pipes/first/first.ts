import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FirstPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'first',
})
export class FirstPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if (value instanceof Array) {
            return (value[0] instanceof Array) ? value[0][0] : value[0];
        }
    return value;
  }
}
