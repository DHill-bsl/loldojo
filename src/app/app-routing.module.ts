import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DojoComponent } from './dojo/dojo.component';
import { MatchHistoryComponent } from "./match-history/match-history.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dojo', component: DojoComponent },
  { path: 'match-history', component: MatchHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
