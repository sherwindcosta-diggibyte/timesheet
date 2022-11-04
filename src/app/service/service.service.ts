import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = "http://localhost:8000";
  private header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
  });
  constructor(private http: HttpClient) { }

  fetchAll(): Observable<any>{

    return this.http.get<any>('http://localhost:8000/tbl_fact_timesheet', {responseType: "json"})
    .pipe(tap((_) => console.log("fetched vendors")),

      // catchError(

      //   this.errorHandlerService.handleError<Vendors[]>("fetchAll", [])

      //   )
        );

     }
     fetchAllEmployee(): Observable<any>{

      return this.http.get<any>('http://localhost:8000/tbl_dim_master_data', {responseType: "json"})
      .pipe(tap((_) => console.log("fetched employee")),
  
        // catchError(
  
        //   this.errorHandlerService.handleError<Vendors[]>("fetchAll", [])
  
        //   )
          );
  
       }
       fetchAllProject(): Observable<any>{

        return this.http.get<any>('http://localhost:8000/tbl_dim_project', {responseType: "json"})
        .pipe(tap((_) => console.log("fetched project")),
    
          // catchError(
    
          //   this.errorHandlerService.handleError<Vendors[]>("fetchAll", [])
    
          //   )
            );
    
         }
     fetchTsId(): Observable<any>{

      return this.http.get<any[]>('http://localhost:8000/tbl_fact_timesheet/:id', {responseType: "json"})
      .pipe(tap((_) => console.log("fetched vendorname and id")),

        // catchError(

        //   this.errorHandlerService.handleError<Vendors[]>("fetchVendorNameId", [])

        //   )
        );

       }
       addUser(userObj:any=[]):Observable<any>{

        return this.http.post(this.url + '/tbl_fact_timesheet', userObj,{headers: this.header});
  
      }
      deleteUser(id:any):Observable<any>{

        return this.http.delete<any>(this.url + '/tbl_fact_timesheet/' + id,{headers: this.header});
      
        }
        ViewUsers(id:string):Observable<any>{

          return this.http.get(this.url + '/tbl_fact_timesheet/' + id, {headers: this.header});
        
        }
        updateUser(id:any, data:any):Observable<any>{

          return this.http.put(this.url + '/tbl_fact_timesheet/' +id, data,{headers: this.header});
        
        }
        getTotalHours(emp_name:string):Observable<any>{

          return this.http.get(this.url + '/hoursOfEmployee/' +emp_name,  {responseType: "json"});
        
        }
        getTotalHoursForType(p_type:string):Observable<any>{

          return this.http.get(this.url + '/hoursOfType/' +p_type,  {responseType: "json"});
        
        }
        getTotalHoursForProjectName(project_name:string):Observable<any>{

          return this.http.get(this.url + '/hoursOfProject/' +project_name,  {responseType: "json"});
        
        }

}
