import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapToIterable' })
export class MapToIterablePipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
      let returnArray = [];

      value.forEach((entryVal, entryKey) => {
          returnArray.push({
              key: entryKey,
              value: entryVal
          });
      });

      return returnArray;
  }
}
