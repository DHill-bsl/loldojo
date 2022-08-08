import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimerService } from '../../../services/timer.service';
import { MatchHistoryFirestore } from '../../../services/match-history.firestore';
import { BattleSummary } from '../../battle-summary';

@Component({
  selector: 'app-battle-in-progress',
  templateUrl: './battle-in-progress.component.html',
  styleUrls: ['./battle-in-progress.component.scss']
})
export class BattleInProgressComponent implements OnInit {
  public hasMatchEnded = false;
  public gameDeleted = false;
  public teamScoreForm?: FormGroup;

  public get battleConfig() {
    return this.gameService.battleConfig;
  }

  constructor(
    private battlefirestore: MatchHistoryFirestore,
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private timerService: TimerService) { }

  public ngOnInit(): void {
    this.teamScoreForm = this.formBuilder.group({
      team1Score: ['', Validators.required],
      team2Score: ['', Validators.required],
    })
  }

  public get isHost() {
    return localStorage.getItem('player') === this.battleConfig.host;
  }

  public getChampion(playerName: string) {
    return this.battleConfig.playerData.find(x => x.name === playerName)!;
  }

  public stopTimer() {
    this.timerService.stopTimer();
  }

  public endGame() {
    const summary: BattleSummary = {
      lane: this.battleConfig.lane,
      championFormat: this.battleConfig.championFormat,
      winnerKills: Math.max(this.teamScoreForm?.get('team1Score')?.value, this.teamScoreForm?.get('team2Score')?.value),
      loserKills: Math.min(this.teamScoreForm?.get('team1Score')?.value, this.teamScoreForm?.get('team2Score')?.value),
      team1: this.getTeam1(),
      team2: this.getTeam2(),
      winners: this.teamScoreForm?.get('team1Score')?.value > this.teamScoreForm?.get('team2Score')?.value ?
        this.getTeam1() : this.getTeam2(),
      timeElapsed: this.timerService.timeElapsed
    }

    this.battlefirestore.saveBattle(summary);
    this.gameService.endGame();
    this.gameDeleted = true;
  }

  private getTeam1(): any[] {
    const x = [];
    if (this.battleConfig.slot1) {
      x.push({
        name: this.battleConfig.slot1.playerName,
        champion: this.battleConfig.playerData.find(x => x.name === this.battleConfig.slot1?.playerName)!.selectedChampion
      });
    }
    if (this.battleConfig.slot3) {
      x.push({
        name: this.battleConfig.slot3.playerName,
        champion: this.battleConfig.playerData.find(x => x.name === this.battleConfig.slot3?.playerName)!.selectedChampion
      });
    }
    return x;
  }

  private getTeam2(): any[] {
    const x = [];
    if (this.battleConfig.slot2) {
      x.push({
        name: this.battleConfig.slot2.playerName,
        champion: this.battleConfig.playerData.find(x => x.name === this.battleConfig.slot2?.playerName)!.selectedChampion
      });    }
    if (this.battleConfig.slot4) {
      x.push({
        name: this.battleConfig.slot4.playerName,
        champion: this.battleConfig.playerData.find(x => x.name === this.battleConfig.slot4?.playerName)!.selectedChampion
      });    }
    return x;
  }
}
