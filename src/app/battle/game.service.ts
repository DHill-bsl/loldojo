import { Injectable, OnDestroy } from '@angular/core';
import { BattleConfig } from './battle-config';
import { ActivatedRoute, Router } from '@angular/router';
import { GameFirestore } from './game.firestore';
import { doc, onSnapshot } from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import { Champion, ChampionMeta, ChampionService } from './champion.service';
import { LolPatchService } from '../services/lol-patch.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GameService implements OnDestroy {
  public gameId: string;
  public battleConfig: BattleConfig;
  public player: string;
  public lolChampions?: ChampionMeta;
  private readonly unsub: Unsubscribe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameFirestore: GameFirestore,
    private championService: ChampionService,
    private lolPatchService: LolPatchService) {
    this.battleConfig = route.snapshot.data['battleConfig'];
    this.player = localStorage.getItem('player')!;
    this.gameId = route.snapshot.params['id'];

    void this.loadChampions();

    this.unsub = onSnapshot(doc(this.gameFirestore.db, this.gameFirestore.docPath, this.gameId), (doc) => {
      const source = doc.metadata.hasPendingWrites ? 'local' : 'server';

      if (source === 'server') {
        if (doc.data() === undefined) {
          this.router.navigate(['/']);
          return;
        }
        this.battleConfig = doc.data() as BattleConfig;
      }
    });
  }

  private async loadChampions() {
    const patches: string[] = await firstValueFrom(this.lolPatchService.getAll());
    this.lolChampions = await firstValueFrom(this.championService.getAll(patches[0]));
  }

  public ngOnDestroy(): void {
    this.unsub();
  }

  public joinSlot(slotNumber: number) {
    this.clearUserFromSlots();

    this.generatePlayerData();

    switch (slotNumber) {
      case 1: this.battleConfig.slot1 = { playerName: this.player }; break;
      case 2: this.battleConfig.slot2 = { playerName: this.player }; break;
      case 3: this.battleConfig.slot3 = { playerName: this.player }; break;
      case 4: this.battleConfig.slot4 = { playerName: this.player }; break;
    }

    this.gameFirestore.update(this.gameId, this.battleConfig);
  }

  public leaveSlot() {
    this.clearUserFromSlots();

    this.gameFirestore.update(this.gameId, this.battleConfig);
  }

  public setChampion(playerName: string, champion: string) {
    const player = this.battleConfig.playerData.find(x => x.name === playerName);

    if (player) {
      player.selectedChampion = champion;
      this.gameFirestore.update(this.gameId, this.battleConfig);
    }
  }

  public reset() {
    this.battleConfig.playerData = [];
    this.battleConfig.slot1 = {};
    this.battleConfig.slot2 = {};
    this.battleConfig.slot3 = {};
    this.battleConfig.slot4 = {};

    this.gameFirestore.update(this.gameId, this.battleConfig);
  }

  public startGame(status: 'setup' | 'inProgress' | 'started' | 'ended') {
    this.battleConfig.gameStatus = status;
    this.gameFirestore.update(this.gameId, this.battleConfig);
  }

  private clearUserFromSlots() {
    if (this.battleConfig.slot1?.playerName === this.player) { this.battleConfig.slot1 = { }; }
    if (this.battleConfig.slot2?.playerName === this.player) { this.battleConfig.slot2 = { }; }
    if (this.battleConfig.slot3?.playerName === this.player) { this.battleConfig.slot3 = { }; }
    if (this.battleConfig.slot4?.playerName === this.player) { this.battleConfig.slot4 = { }; }
  }

  private generatePlayerData() {
    const playerData = this.battleConfig.playerData.find(x => x.name === this.player);

    if (!playerData) {
      this.battleConfig.playerData.push({
        name: this.player,
        champions: this.generateChampions(),
        selectedChampion: ''
      });
    }
  }

  private generateChampions(): Champion[] {
    let championList: Champion[] = [];
    const playerChampions: Champion[] = [];

    Object.entries(this.lolChampions!.data).map(([key, value]) => {
      championList.push(value);
    });
    for (let i = 0; i < this.battleConfig.championsPerPlayer; i++) {
      let championListFiltered;
      switch (this.battleConfig.championFormat) {
        case 'All':
          playerChampions.push(this.getRandomChampion(championList));
          break;
        case 'Fighter':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Fighter'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
        case 'Mage':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Mage'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
        case 'Support':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Support'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
        case 'Tank':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Tank'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
        case 'Assassin':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Assassin'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
        case 'Marksman':
          championListFiltered = championList.filter(x => x.tags.some(s => s === 'Marksman'));
          playerChampions.push(this.getRandomChampion(championListFiltered));
          break;
      }
    }

    return playerChampions;
  }

  private getRandomChampion(championList: Champion[]): Champion {
    const random = Math.floor(Math.random() * championList.length);
    return championList[random];
  }

  public endGame() {
    this.gameFirestore.delete(this.gameId);
  }
}
