import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ServiceService } from '../service/service.service';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
export interface DynamicGrid{     
  title1:string;  
  title2:string;  
  title3:string;  
} 
@Component({
  selector: 'app-poc-table',
  templateUrl: './poc-table.component.html',
  styleUrls: ['./poc-table.component.css']
})
export class PocTableComponent implements OnInit {

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
    getEmpname:any;
    emp_name:any;
    getProjname:any;
    projname:any;
    currentTime = new Date();


   
  newDynamic: any = {};


// get current month  getMonth(), +1 means getting current month

minDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), +1);

maxDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() +1, +0);

  constructor(public service:ServiceService) { }

  ngOnInit(): void {
    
    this.getEmpname = this.service.fetchAllEmployee().subscribe((data:any)=>{

      // console.log(data);
    
      this.emp_name = data;
    
      console.log(this.emp_name);
    });
    this.getProjname = this.service.fetchAllProject().subscribe((data:any)=>{

      // console.log(data);
    
      this.projname = data;
    
      console.log(this.projname);
    });

    // this.newDynamic = {date: "", project_name: "",task_name:"",hours:""};  
    //   this.logdata.push(this.newDynamic); 
  }

  displayedColumns: string[] = ['date', 'project_name', 'task_name', 'hours'];
  dataSource = this.logdata;

  @ViewChild(MatTable) table!: MatTable<any>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.logdata.length);
    this.dataSource.push(this.logdata[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
  addRow(index:number) {    
    this.newDynamic = {date: "", project_name: "",task_name:"",hours:""};  
    this.logdata.push(this.newDynamic);  
    // this.toastr.success('New row added successfully', 'New Row');  
    console.log(this.logdata);  
    return true;  
}  
  
deleteRow(index:number) {  
    if(this.logdata.length ==1) {  
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;  
    } else {  
        this.logdata.splice(index, 1);  
        // this.toastr.warning('Row deleted successfully', 'Delete row');  
        return true;  
    }  
}  

}
