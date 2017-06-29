import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FirstPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'firstWord',
})
export class FirstWordPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let words = value.split(' ');
    return words[0];
  }
}
