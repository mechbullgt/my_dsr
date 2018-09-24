import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

// 1) Import for routing
import {RouterModule, Routes} from '@angular/router';
// 2) Import to use Angular Material Toolbar
import {MatToolbarModule} from '@angular/material';
// 3) Import to connect backend to frontend
import {IssueService}  from './issue.service';

// 1.1) Routing Configuration
const routes: Routes = [
  {path:'create', component: CreateComponent},
  {path:'list',component:ListComponent},
  {path:'edit/:id',component:UpdateComponent},
  {path:'',redirectTo:'/list',pathMatch:'full'}
];

// 1.2 RouterModule added in the @NgModule decorator to activate the routing
// 2.1 Adding Material Toolbar to imports.
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule
  ],
  providers: [
    IssueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
