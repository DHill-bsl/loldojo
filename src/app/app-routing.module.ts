import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DojoComponent } from './dojo/dojo.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dojo', component: DojoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
