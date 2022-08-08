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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  public ngOnInit(): void { }

  public getChampionList(): Champion[] {
    const playerData = this.gameService.battleConfig.playerData.find(x => x.name === this.slot?.playerName);

    if (playerData) {
      return playerData.champions;
    }

    return [];
  }

  public onJoinSlot() {
    this.gameService.joinSlot(this.slotNumber);
  }

  public onLeaveSlot() {
    this.gameService.leaveSlot();
  }

  public selectChampion(champion: Champion) {
    this.gameService.setChampion(this.player, champion.name);
  }
}
