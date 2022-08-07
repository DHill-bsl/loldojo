import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slot } from '../../battle-config';
import { GameService } from '../../game.service';
import { Champion } from '../../champion.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  public currentChampionImage = '';
  @Input() public slotNumber!: number;

  public get slot(): Slot | undefined {
    switch (this.slotNumber) {
      case 1: return this.gameService.battleConfig.slot1;
      case 2: return this.gameService.battleConfig.slot2;
      case 3: return this.gameService.battleConfig.slot3;
      case 4: return this.gameService.battleConfig.slot4;
      default: return this.gameService.battleConfig.slot1;
    }
  }

  public get player(): string {
    return this.gameService.player;
  }

  public get isMyPlayer() {
    return this.slot?.playerName === this.player;
  }

  public get playerData() {
    return this.gameService.battleConfig.playerData.find(x => x.name === this.slot?.playerName);
  }

  public get selectedChampion() {
    return this.playerData?.selectedChampion ?? '';
  }

  public set selectedChampion(value: string) {
    if (this.playerData) {
      this.playerData.selectedChampion = value;
    }
  }

  public get championImage() {
    const champion = this.playerData?.champions.find(x => x.name === this.selectedChampion);

    if (champion) {
      const name = champion.image.full.slice(0, -4);
      const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;

      if (this.currentChampionImage !== image) {
        this.currentChampionImage = image;
        return this.currentChampionImage;
      } else {
        return this.currentChampionImage;
      }
    } else {
      this.currentChampionImage = '';
    }
    return this.currentChampionImage;
  }

  public getChampionList(): Champion[] | undefined {
    const playerData = this.gameService.battleConfig.playerData.find(x => x.name === this.slot?.playerName);

    if (playerData) {
      return playerData.champions;
    }

    return undefined;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  public ngOnInit(): void { }

  public onJoinSlot() {
    this.gameService.joinSlot(this.slotNumber);
  }

  public onLeaveSlot() {
    this.gameService.leaveSlot();
  }

  public selectChampion(champion: string) {
    this.gameService.setChampion(this.player, champion);
  }
}
