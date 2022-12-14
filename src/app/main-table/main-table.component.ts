import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ServiceService } from '../service/service.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
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
  dataSource:any;
  todeletedata:any;
  data:any;
  // filterValues:any = {};
  getEmpname:any;
  emp_name:any;
  getProjname:any;
  projname:any;
  filterData:any = {};
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
    // filterSelectObj :any = [];
    fileName= 'ExcelSheet.xlsx';
    totalhour:any;
    total=0;    
    value: any;
    totalhourshow=true;
    @ViewChild(MatPaginator)paginator!: MatPaginator;
    ngOnInit(): void {
    this.service.fetchAll().subscribe(data=>{
     this.alltimesheetdata = data;
     this.findsum(this.alltimesheetdata);
     this.dataSource = new MatTableDataSource(this.alltimesheetdata);
      //  this.dataSource.data = this.alltimesheetdata;
     this.dataSource.paginator = this.paginator;
    })
    //getting all employees
    this.getEmpname = this.service.fetchAllEmployee().subscribe((data:any)=>{
      this.emp_name = data;
     
    });
    //getting all projects
    this.getProjname = this.service.fetchAllProject().subscribe((data:any)=>{
      this.projname = data;
    });
   
  }
  constructor(private service:ServiceService,private router:Router){
    this.dataSource = new MatTableDataSource(this.alltimesheetdata);
    this.dataSource.paginator = this.paginator;

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
  findsum(data:any){    
    this.value=data    
    for(let j=0;j<data.length;j++){  
      this.total+= this.value[j].hours
    }  

  }
  //filter by type
  onChangeType(data:any)
  {
    if(data?.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.alltimesheetdata);
    }
    else{
    this.filterData = _.filter(this.alltimesheetdata,(item:any)=>{
      return item.p_type?.toLowerCase() == data.toLowerCase();

    })
    this.dataSource = new MatTableDataSource(this.filterData);
    this.dataSource.paginator = this.paginator;
    }
    this.service.getTotalHoursForType(data).subscribe((res)=>{
      if(res[0].hours!=null)
      {
        this.totalhourshow = false;
        this.totalhour = res;
        console.log(res);
      }
      else{
        this.totalhourshow = true;
      }
    })
   
   }
     //filter by employee name
   onChangeEmployeeName(data:string)
   {
    console.log(data)
    if(data?.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.alltimesheetdata);
    }
    else{
      this.filterData = _.filter(this.alltimesheetdata,(item:any)=>{
        return item.emp_name?.toLowerCase() == data.toLowerCase();
      })
      this.dataSource = new MatTableDataSource(this.filterData);
      this.dataSource.paginator = this.paginator;
    }
    this.service.getTotalHours(data).subscribe((res)=>{
      if(res[0].hours!=null)
      {
       
        this.totalhourshow = false;
        this.totalhour = res;
        
        console.log(this.totalhour)
      }
      else{
        this.totalhourshow = true;
      }
    })
   }
   //filter by project name
   onChangeProjectName(data:string)
   {
    console.log(data)
    if(data?.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.alltimesheetdata);
    }
    
    else{
    this.filterData = _.filter(this.alltimesheetdata,(item:any)=>{
      return item.project_name?.toLowerCase() == data.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(this.filterData);
    this.dataSource.paginator = this.paginator;
    }
    this.service.getTotalHoursForProjectName(data).subscribe((res)=>{
      if(res[0].hours!=null)
      {
       this.totalhourshow = false;
        this.totalhour = res;
        console.log(res);
        console.log(this.totalhour)
      }
      else{
        this.totalhourshow = true;
      }
    })
   }

   
}
