import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormComponent } from './edit-form/edit-form.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { MainTableComponent } from './main-table/main-table.component';

const routes: Routes = [
  {path:'timesheet',component:MainTableComponent},
  {path:'logsheet',component:EditableTableComponent},
{path:'editform/:id',component:EditFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
