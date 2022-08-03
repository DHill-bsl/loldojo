import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Champion } from "../../../models/lol/champion";

@Component({
  selector: 'app-dojo-battle-champion',
  templateUrl: './dojo-battle-champion.component.html',
  styleUrls: ['./dojo-battle-champion.component.scss']
})
export class DojoBattleChampionComponent implements OnChanges {
  @Input() public champion?: Champion;
  @Input() public borderRadius = '10px';
  public backgroundImage = '';

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['champion']) {
      const champion = changes['champion'].currentValue as Champion;
      this.backgroundImage = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`;
    }
  }
}
