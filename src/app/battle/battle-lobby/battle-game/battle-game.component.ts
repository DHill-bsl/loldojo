import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { TimerService } from '../../../services/timer.service';

@Component({
  selector: 'app-battle-game',
  templateUrl: './battle-game.component.html',
  styleUrls: ['./battle-game.component.scss']
})
export class BattleGameComponent implements OnInit {
  public battleStarted = false;
  public battleEnded = false;

  constructor(public gameService: GameService, private timerService: TimerService) { }

  ngOnInit(): void { }

  public get totalPlayers() {
    return this.gameService.battleConfig.playerCount;
  }

  public get allJoined() {
    let numReady = 0;

    if (this.gameService.battleConfig.slot1?.playerName) { numReady++; }
    if (this.gameService.battleConfig.slot2?.playerName) { numReady++; }
    if (this.gameService.battleConfig.slot3?.playerName) { numReady++; }
    if (this.gameService.battleConfig.slot4?.playerName) { numReady++; }

    return numReady === this.gameService.battleConfig.playerCount;
  }

  public get playersReady() {
    return this.gameService.battleConfig.playerData.filter(x => x.selectedChampion !== '').length;
  }

  public startBattle() {
    this.timerService.startTimer();
    this.gameService.startGame('inProgress');
  }
}
