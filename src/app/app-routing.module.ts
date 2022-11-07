import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDynamicallyComponent } from './add-dynamically/add-dynamically.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { HomeComponent } from './home/home.component';
import { MainTableComponent } from './main-table/main-table.component';
import { PocTableComponent } from './poc-table/poc-table.component';

const routes: Routes = [
  {path:'timesheet',component:MainTableComponent},
  {path:'logsheet',component:EditableTableComponent},
{path:'editform/:id',component:EditFormComponent},
{path:'poc',component:PocTableComponent},
{path:'home',component:HomeComponent},
{
  path: 'addrows',
  component: AddDynamicallyComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
