import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeFormater'
})
export class CodeFormaterPipePipe implements PipeTransform {

  transform(value: string): string {

    let formated = (value != undefined && value.length > 5) ? value.substr(value.length - 6) : value;
    formated = formated != null ? formated.toUpperCase() : formated;
    return formated;
  }

}
