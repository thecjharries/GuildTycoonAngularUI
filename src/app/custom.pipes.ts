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

@Pipe({ name: 'timeRemaining'})
export class TimeRemainingPipe implements PipeTransform{
    transform(value:Date, args?: any[]): number{
        if (value == null){
            return 0;
        }
        // var now = Math.floor(Date.now() / 1000);
        var now = (new Date().getUTCDate()).valueOf();
        // var end = new Date(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDay(), value.getUTCHours(), value.getUTCMinutes(), value.getUTCSeconds())
        var end = (new Date(value)).valueOf();
        var timeRemaining = end-now;
        if(timeRemaining > 0){
            return timeRemaining;
        }
        return timeRemaining;
    }
}