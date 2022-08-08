import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchHistoryComponent } from "./match-history/match-history.component";
import { BattleLobbyComponent } from './battle/battle-lobby/battle-lobby.component';
import { CreateBattleComponent } from './battle/create-battle/create-battle.component';
import { GameResolver } from './battle/game.resolver';
import { LoginComponent } from './login/login.component';
import { PlayerGuard } from './guards/player-guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'match-history', component: MatchHistoryComponent },
  { path: 'battle/create', component: CreateBattleComponent, canActivate: [PlayerGuard] },
  { path: 'battle/lobby/:id', component: BattleLobbyComponent, resolve: { battleConfig: GameResolver }, canActivate: [PlayerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
