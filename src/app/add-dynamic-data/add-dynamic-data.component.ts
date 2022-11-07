import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-add-dynamic-data',
  templateUrl: './add-dynamic-data.component.html',
  styleUrls: ['./add-dynamic-data.component.css']
})
export class AddDynamicDataComponent implements OnInit {

  logdata = [
    {
      emp_name: "",
    }
  ]

  proname = [
    {
      project_name: ""
    }
  ];

  week_no=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27",
    "28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52",]

  //dynamically adding rows
  /* starts here */
  name = 'Angular';  
    
  productForm: FormGroup;  

  constructor(private fb:FormBuilder, private service:ServiceService) {  
    this.productForm = this.fb.group({  
      emp_name: '',
      name: '',  
      position: '',
      weeks: '',
      quantities: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.service.fetchAllEmployee().subscribe((data:any)=>{
      this.logdata = data;
      console.log(data);
    });
    this.service.fetchAllProject().subscribe((data:any)=> {
      this.proname = data;
      console.log(data);
    })
  }

  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({      
      date: '',  
      projname: '',
      task_name: '',
      hours: ''
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    this.service.addUser(this.productForm.value).subscribe((res)=>{
      console.log(res);
    })  
  }  
  /*ends here */
}

