import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
// export interface PeriodicElement {
//   date: string;
//   project_name: string;
//   task_name: string;
//   type:string;
//   hours: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {date: "22/09/2022", project_name: 'onboarding', task_name: "creating component", type:"devops", hours: 8},
//   {date: "22/09/2022", project_name: 'onboarding', task_name: "creating component",  type:"development",hours: 8},
// ];
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})

export class MainTableComponent implements OnInit {
  alltimesheetdata:any=[];
  dataSource! :MatTableDataSource<any>;
  todeletedata:any;
  data:any;
  filterValues:any = {};

  logdata =[
    {
      "ts_id":"0",
      "week_no":"",
      "date":"",
      "emp_name":"",
      "project_name": "",
      "task_name": "",
      "p_type":"",
      "hours": "",
      // "isEdit": false

    }]
    isEdit=false;
 
  displayedColumns: string[] = ['select','week_no', 'date','emp_name', 'project_name', 'task_name','p_type' ,'hours'];
  
  selection = new SelectionModel<any>(true, []);


  filterSelectObj :any = [];

  fileName= 'ExcelSheet.xlsx';
   totalhour:any;
  ngOnInit(): void {
    this.service.fetchAll().subscribe(data=>{
     this.alltimesheetdata = data;
     this.dataSource = new MatTableDataSource(this.alltimesheetdata);
     this.dataSource.data = this.alltimesheetdata;
     this.filterSelectObj.filter((o:any) => {
      o.options = this.getFilterObject(this.alltimesheetdata, o.columnProp);
    });
     this.dataSource.filterPredicate = this.createFilter();
    })
    
  }
  constructor(private service:ServiceService,private router:Router){
    this.filterSelectObj = [
      {
        name: 'Project Name',
        columnProp: 'emp_name',
        options: []
      },
      {
        name: 'Project Name',
        columnProp: 'project_name',
        options: []
      },
      {
        name: 'Type',
        columnProp: 'p_type',
        options: []
      },

     ]

  }

  filterChange(filter:any, event:any) {
    //let filterValues = {}
  
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log(this.filterValues)
    // this.service.getTotalHours(this.filterValues).subscribe((res:any)=>{
    //   this.totalhour = res;
    //   console.log(res);
    // })
    //   console.log(this.totalhour)
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      // console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word:any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  getFilterObject(fullObj:any, key:any) {
    const uniqChk:any = [];
    fullObj.filter((obj:any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // data(row:any)
  // {
  //   console.log(row)
  //   this.todeletedata =  row;
  // }
  delete()
  {
    let data = this.selection.selected;
    let id = data[0].ts_id;
    this.service.deleteUser(id).subscribe(res=>{
      console.log(res)
    })
    window.location.reload()
  }
  edit()

  {

    this.data = this.selection.selected;

    var id  = this.data[0].ts_id;

    this.router.navigate([`/editform`,id])

  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
   
}
