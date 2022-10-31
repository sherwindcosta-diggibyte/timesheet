import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(emp_name: any[], searchTxt: string): any[] {
    if(!emp_name || !emp_name.length) return emp_name;
    if(!searchTxt || !searchTxt.length) return emp_name;
    return emp_name.filter(item => {
      return item.viewValue.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }

}
