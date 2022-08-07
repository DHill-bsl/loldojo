import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-battle-game',
  templateUrl: './battle-game.component.html',
  styleUrls: ['./battle-game.component.scss']
})
export class BattleGameComponent implements OnInit {
  public battleStarted = false;
  public battleEnded = false;

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  public startBattle() {

  }
}
