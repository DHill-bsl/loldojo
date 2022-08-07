import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'app-battle-lobby',
  templateUrl: './battle-lobby.component.html',
  styleUrls: ['./battle-lobby.component.scss'],
  providers: [ GameService, ChampionService ]
})
export class BattleLobbyComponent implements OnInit {
  public get battleConfig() {
    return this.gameService.battleConfig;
  }

  constructor(private gameService: GameService) { }

  public ngOnInit(): void { }
}
