import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingMean'
})
export class RatingMeanPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    let ratingMean = 0;
    if (value != undefined && value != null) ratingMean = value.reduce(
      (prev, curr, currInd, arr) => prev + (curr.quotation / value.length),
      0
    )
    return ratingMean;
  }

}
