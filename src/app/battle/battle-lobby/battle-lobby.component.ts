import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ChampionService } from '../champion.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-battle-lobby',
  templateUrl: './battle-lobby.component.html',
  styleUrls: ['./battle-lobby.component.scss'],
  providers: [ GameService, ChampionService, TimerService ]
})
export class BattleLobbyComponent implements OnInit {
  public get battleConfig() {
    return this.gameService.battleConfig;
  }

  public get gameStatus() {
    return this.battleConfig.gameStatus;
  }

  constructor(private gameService: GameService) { }

  public ngOnInit(): void { }
}
