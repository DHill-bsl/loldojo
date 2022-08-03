import { Component, Input, OnInit } from '@angular/core';
import { DojoSetup } from "../dojo-setup";
import { ChampionService } from "../../services/champion.service";
import { firstValueFrom } from "rxjs";
import { LolPatchService } from "../../services/lol-patch.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Champion, ChampionMeta} from "../../models/lol/champion";

@Component({
  selector: 'app-dojo-battle',
  templateUrl: './dojo-battle.component.html',
  styleUrls: ['./dojo-battle.component.scss']
})
export class DojoBattleComponent implements OnInit {
  @Input() public setupData?: DojoSetup;

  public champions?: ChampionMeta;
  public battleForm?: FormGroup;
  public opponent1BackgroundImage = ''
  public opponent2BackgroundImage = ''

  constructor(
    private championService: ChampionService,
    private lolPatchService: LolPatchService,
    private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.initForm();
    void this.loadChampions().then(() => {
      this.generateChampion(this.battleForm?.controls['opponent1Champion'] as FormControl);
      this.generateChampion(this.battleForm?.controls['opponent2Champion'] as FormControl);
    });
  }

  public generateChampion(opponent: AbstractControl) {
    if (!this.champions) { return; }
    const format = this.setupData?.championFormat;
    let championList: Champion[] = [];

    Object.entries(this.champions.data).map(([key, value]) => {
      championList.push(value);
    });

    switch (format) {
      case 'All':
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Fighter':
        championList = championList.filter(x => x.tags.some(s => s === 'Fighter'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Mage':
        championList = championList.filter(x => x.tags.some(s => s === 'Mage'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Support':
        championList = championList.filter(x => x.tags.some(s => s === 'Support'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Tank':
        championList = championList.filter(x => x.tags.some(s => s === 'Tank'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Assassin':
        championList = championList.filter(x => x.tags.some(s => s === 'Assassin'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
      case 'Marksman':
        championList = championList.filter(x => x.tags.some(s => s === 'Marksman'));
        opponent.setValue(this.getRandomChampion(championList));
      break;
    }
  }

  private getRandomChampion(championList: Champion[]): Champion {
    const random = Math.floor(Math.random() * championList.length);
    console.log(championList[random]);
    return championList[random];
  }

  private initForm() {
    this.battleForm = this.formBuilder.group({
      opponent1Champion: ['', [Validators.required]],
      opponent2Champion: ['', [Validators.required]]
    });
  }

  private async loadChampions() {
    const patchNumbers: string[] = await firstValueFrom(this.lolPatchService.getAll());
    this.champions = await firstValueFrom(this.championService.getAll(patchNumbers[0]))
    console.log(this.champions);
  }
}
