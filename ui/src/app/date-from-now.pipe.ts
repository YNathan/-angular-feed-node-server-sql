import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromNow'
})
export class DateFromNowPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    let strToReturn = "";
    let nowDate = new Date(Date.now());
    if (this.DateDiff.inYears(value, nowDate) === 0) {
      if (this.DateDiff.inMonths(value, nowDate) === 0) {
        if (this.DateDiff.inDays(value, nowDate) === 0) {
          if (this.DateDiff.inHoures(value, nowDate) === 0) {
            if (this.DateDiff.inMinutes(value, nowDate) === 0) {
              if (this.DateDiff.inSeconds(value, nowDate) === 0) {
                strToReturn = "now";        
              }else{
                strToReturn = Math.abs(this.DateDiff.inSeconds(value, nowDate)) +" secondes ago";        
              }
            }else{
              strToReturn = Math.abs(this.DateDiff.inMinutes(value, nowDate)) +" minutes ago";      
            }
          }else{
            strToReturn = Math.abs(this.DateDiff.inHoures(value, nowDate)) +" houres ago";    
          }
        }else{
          strToReturn = Math.abs(this.DateDiff.inDays(value, nowDate)) +" days ago";    
        }
      }else{
        strToReturn = Math.abs(this.DateDiff.inMonths(value, nowDate)) +" month ago";  
      }
    }else{
      strToReturn = Math.abs(this.DateDiff.inYears(value, nowDate)) +" years ago";
    }
    return strToReturn;
  }

  sqlDateTime = function (date) {
    var dt = new Date(date);
    return {
      'Y': dt.getUTCFullYear(),
      'M': (dt.getUTCMonth() + 1),
      'D': dt.getUTCDate(),
      'H': dt.getUTCHours(),
      'MI': dt.getUTCMinutes(),
      'S': dt.getUTCSeconds()
    }
  };

  DateDiff = {
    sqlDateTime : function (date) {
      var dt = new Date(date);
      let obj =  {  Y: dt.getUTCFullYear(), M: (dt.getUTCMonth() + 1),D: dt.getUTCDate(),H: dt.getUTCHours(),MI: dt.getUTCMinutes(),S: dt.getUTCSeconds()};
      return obj;
    },
    inSeconds: function (d1, d2) {
      return this.sqlDateTime(d1).S - this.sqlDateTime(d2).S;
    },
    inMinutes: function (d1, d2) {
      return this.sqlDateTime(d1).MI - this.sqlDateTime(d2).MI;
    },
    inHoures: function (d1, d2) {
      return this.sqlDateTime(d1).H - this.sqlDateTime(d2).H;
    },
    inDays: function (d1, d2) {
      return this.sqlDateTime(d1).D - this.sqlDateTime(d2).D;
    },

    inWeeks: function (d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return (t2 - t1) / (24 * 3600 * 1000 * 7);
    },

    inMonths: function (d1, d2) {
      return this.sqlDateTime(d1).M - this.sqlDateTime(d2).M;
    },

    inYears: function (d1, d2) {
      return d2.getFullYear() - d1.getFullYear();
    }
  }
}
