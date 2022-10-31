import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  getEmpname:any;
  // emp_name:any;
  getProjname:any;
  projname:any;
  searchTxt: any;

myDate = new Date();
id:any;
backdata:any;
  //  Mon!: 8;
  
  // Tue!: 8;
  TotalHours!:any;
  // logdata =[
  //   {
  //     "emp_name":"",
  //     "p_type":"",
  //     "week_no":"",
     
  //     "ts_id":"",
  //     "date":"",
  //     "project_name": "",
  //     "task_name": "",
  //     "hours": "",
      

  //   }]

    week_no=[
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
  logdata: UntypedFormGroup = new UntypedFormGroup({});
  constructor(private route:ActivatedRoute,private service:ServiceService,private router:Router,private formBuilder: UntypedFormBuilder,
    private pipe:DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id');
      if(this.id !== ''){

        this.service.ViewUsers(this.id).subscribe((data) =>{

          this.backdata = data;

          // Object.assign(this.userDetails, data);

          console.log(this.backdata);

          // this.logdata =[
          //   {
          //     "ts_id":this.backdata[0].ts_id,
          //     "week_no":this.backdata[0].week_no,
          //     "date":this.backdata[0].date,
          //     "emp_name":this.backdata[0].emp_name,
          //     "project_name":this.backdata[0].project_name,
          //     "task_name": this.backdata[0].task_name,
          //     "hours": this.backdata[0].hours,
          //     // "isEdit": false
          //     "p_type":this.backdata[0].p_type,
             
        
          //   }]
            this.logdata = this.formBuilder.group({

     

              'ts_id': new UntypedFormControl(this.backdata[0].ts_id),
              
              'week_no': new UntypedFormControl(this.backdata[0].week_no),
              
              'date': new UntypedFormControl(this.pipe.transform(this.backdata[0].date,'YYYY-MM-dd')),
        
              'emp_name': new UntypedFormControl(this.backdata[0].emp_name),
        
              'project_name': new UntypedFormControl(this.backdata[0].project_name),
        
              'task_name': new UntypedFormControl(this.backdata[0].task_name),
        
              'hours': new UntypedFormControl(this.backdata[0].hours),
        
              'p_type': new UntypedFormControl(this.backdata[0].p_type),
        
        
              })
            
        })
      }
  })
}
update(){
  console.log(this.logdata)
  console.log(this.id)
  this.service.updateUser(this.id,this.logdata.value).subscribe(data =>{

    // this.snackbar.open("Updated Successfully","Ok",{duration:2000});
    // console.log("enter")
    console.log(data)

  })
   //window.location.reload();

   this.router.navigate(['/timesheet']);
}



}
