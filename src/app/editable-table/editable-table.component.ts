
import {Component, OnInit, ViewChild} from '@angular/core';

import { DatePipe } from '@angular/common';
import { ServiceService } from '../service/service.service';

import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  getEmpname:any;
  emp_name:any;
  getProjname:any;
  projname:any;
  searchTxt: any;
  dynamicArray: any = [];

  newDynamic:any;
myDate = new Date();

  //  Mon!: 8;
  
  // Tue!: 8;
  TotalHours!:any;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};


  currentTime = new Date();

// get current month  getMonth(), +1 means getting current month

minDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), +1);

maxDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() +1, +0);

  constructor(public datepipe: DatePipe, private service:ServiceService) { 

  }
  // formData:FormGroup=this.fb.group({
  //   ts_id:new FormControl(''),
  //   emp_name:new FormControl(''),
  //   type:new FormControl(''),
  //   week:new FormControl(''),
  //   date:new FormControl(''),
  //   project_name:new FormControl(''),
  //   task_Name:new FormControl(''),
  //   hours:new FormControl(''),
   
  
  // })

  week_no:any=[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
]

  logdata:any =[
    {
      "ts_id":"0",
      "emp_name":"",
      "p_type":"",
      "week_no":"",
     
      "date":"",
      "project_name": "",
      "task_name": "",
      "hours": "",
    },
    
]
  
 
  displayedColumns: string[] = ['date', 'project_name', 'task_name', 'hours','save'];
  dataSource = this.logdata;

  @ViewChild(MatTable) table!: MatTable<any>;
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
  }
  onEdit(item:any){
item.isEdit = true;
  }
  addUser(data:any)
  {
    console.log(data)

    this.service.addUser(data).subscribe((res)=>{
      console.log(res);
    })
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.emp_name.filter = filterValue.trim().toLowerCase();
 
  }
  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.logdata.length);
    this.dataSource.push(this.logdata[randomElementIndex]);
    this.table.renderRows();
  }
 
  addRow() {

    this.dynamicArray.push({ id: '', date: '', project_name: '', task_name: '', hours: '' });
  
    console.log('New row added successfully', 'New Row');
  
  }
  
}