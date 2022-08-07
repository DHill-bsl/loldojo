import { Component } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-battle-settings',
  templateUrl: './battle-settings.component.html',
  styleUrls: ['./battle-settings.component.scss']
})
export class BattleSettingsComponent {
  public get battleConfig() {
    return this.gameService.battleConfig;
  }
  constructor(public gameService: GameService) { }

  public resetAll() {
    this.gameService.reset();
  }
}
