import { Component, Input, OnInit } from '@angular/core';
import { DojoSetup } from "../dojo-setup";
import { ChampionService } from "../../services/champion.service";
import { firstValueFrom } from "rxjs";
import { LolPatchService } from "../../services/lol-patch.service";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import { Champion, ChampionMeta } from "../../models/lol/champion";

@Component({
  selector: 'app-dojo-battle',
  templateUrl: './dojo-battle.component.html',
  styleUrls: ['./dojo-battle.component.scss']
})
export class DojoBattleComponent implements OnInit {
  @Input() public setupData?: DojoSetup;

  public champions?: ChampionMeta;
  public battleForm?: FormGroup;

  public get is2v2() {
    return !!(this.battleForm?.get('team1')?.get('player2')?.get('name')?.value &&
      this.battleForm?.get('team2')?.get('player2')?.get('name')?.value);
  }

  constructor(
    private championService: ChampionService,
    private lolPatchService: LolPatchService,
    private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.initForm();
    void this.loadChampions().then(() => {
      this.generateTeams();
    });
  }

  public generateChampion(): Champion {
    const format = this.setupData?.championFormat;
    let championList: Champion[] = [];

    Object.entries(this.champions!.data).map(([key, value]) => {
      championList.push(value);
    });

    switch (format) {
      case 'All':
        return this.getRandomChampion(championList);
      case 'Fighter':
        championList = championList.filter(x => x.tags.some(s => s === 'Fighter'));
        return this.getRandomChampion(championList);
      case 'Mage':
        championList = championList.filter(x => x.tags.some(s => s === 'Mage'));
        return this.getRandomChampion(championList);
      case 'Support':
        championList = championList.filter(x => x.tags.some(s => s === 'Support'));
        return this.getRandomChampion(championList);
      case 'Tank':
        championList = championList.filter(x => x.tags.some(s => s === 'Tank'));
        return this.getRandomChampion(championList);
      case 'Assassin':
        championList = championList.filter(x => x.tags.some(s => s === 'Assassin'));
        return this.getRandomChampion(championList);
      case 'Marksman':
        championList = championList.filter(x => x.tags.some(s => s === 'Marksman'));
        return this.getRandomChampion(championList);
    }
    return this.getRandomChampion(championList);
  }

  private getRandomChampion(championList: Champion[]): Champion {
    const random = Math.floor(Math.random() * championList.length);
    console.log(championList[random]);
    return championList[random];
  }

  private initForm() {
    this.battleForm = this.formBuilder.group({
      team1: this.formBuilder.group({
        player1: this.formBuilder.group({
          name: [''],
          champion: ['']
        }),
        player2: this.formBuilder.group({
          name: [''],
          champion: ['']
        }),
      }),
      team2: this.formBuilder.group({
        player1: this.formBuilder.group({
          name: [''],
          champion: ['']
        }),
        player2: this.formBuilder.group({
          name: [''],
          champion: ['']
        })
      })
    });
  }

  private generateTeams() {
    function shuffle(players: string[]): string[] {
      for (let i = players.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = players[i];
        players[i] = players[j];
        players[j] = temp;
      }
      return players;
    }

    const players = [];
    this.setupData?.opponent1 ? players.push(this.setupData.opponent1) : '';
    this.setupData?.opponent2 ? players.push(this.setupData.opponent2) : '';
    this.setupData?.opponent3 ? players.push(this.setupData.opponent3) : '';
    this.setupData?.opponent4 ? players.push(this.setupData.opponent4) : '';
    const playersShuffled = shuffle(players);
    this.battleForm?.get('team1')!.get('player1')!.patchValue({ name: playersShuffled[0], champion: this.generateChampion() });
    this.battleForm?.get('team2')!.get('player1')!.patchValue({ name: playersShuffled[1], champion: this.generateChampion() });

    if (playersShuffled.length > 2)
      this.battleForm?.get('team1')!.get('player2')!.patchValue({ name: playersShuffled[2], champion: this.generateChampion() });

    if (playersShuffled.length > 3)
      this.battleForm?.get('team2')!.get('player2')!.patchValue({ name: playersShuffled[3], champion: this.generateChampion() });

    console.log(this.battleForm);
  }

  private async loadChampions() {
    const patchNumbers: string[] = await firstValueFrom(this.lolPatchService.getAll());
    this.champions = await firstValueFrom(this.championService.getAll(patchNumbers[0]))
    console.log(this.champions);
  }

  public refreshChampion(champion: AbstractControl | undefined | null) {
    champion?.setValue(this.generateChampion());
  }
}
