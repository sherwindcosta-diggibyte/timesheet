import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MainTableComponent } from './main-table/main-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchPipe } from './pipe/search.pipe';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PocTableComponent } from './poc-table/poc-table.component';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { AddDynamicallyComponent } from './add-dynamically/add-dynamically.component';
import { EditableTable1Component } from './editable-table1/editable-table1.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableTableComponent,
    MainTableComponent,
    SearchPipe,
    EditFormComponent,
    PocTableComponent,
    HomeComponent,
    AddDynamicallyComponent,
    EditableTable1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatButtonModule
    
  ],
  exports: [
    MatInputModule
  ],
  providers: [ DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
