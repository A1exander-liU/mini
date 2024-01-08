import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
  standalone: true,
})
export class ReplacePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    searchValue: string,
    replaceValue: string
  ) {
    if (!value) {
      return '';
    }
    const regex = new RegExp(searchValue, 'g');
    return value.replace(regex, replaceValue);
  }
}
