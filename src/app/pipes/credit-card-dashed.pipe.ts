import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardDashed',
})
export class CreditCardDashedPipe implements PipeTransform {
  transform(value: string): string {
    const substrings = [];
    for (let i = 0; i < value.length; i += 4) {
      substrings.push(value.substring(i, i + 4));
    }

    return substrings.join('-');

    // return (
    //   value.substring(0, 4) +
    //   '-' +
    //   value.substring(4, 8) +
    //   '-' +
    //   value.substring(8, 12) +
    //   '-' +
    //   value.substring(12, 16)
    // );
  }
}
