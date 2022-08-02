import { Component, Input, OnInit } from '@angular/core';
import { DojoSetup } from "../dojo-setup";
import { ChampionService } from "../../services/champion.service";
import { firstValueFrom } from "rxjs";
import { LolPatchService } from "../../services/lol-patch.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Champion, ChampionMeta} from "../../models/lol/champion";

@Component({
  selector: 'app-dojo-battle',
  templateUrl: './dojo-battle.component.html',
  styleUrls: ['./dojo-battle.component.scss']
})
export class DojoBattleComponent implements OnInit {
  @Input() public data?: DojoSetup;

  public champions?: ChampionMeta;
  public battleForm?: FormGroup;
  public opponent1BackgroundImage = ''
  public opponent2BackgroundImage = ''

  constructor(
    private championService: ChampionService,
    private lolPatchService: LolPatchService,
    private formBuilder: FormBuilder) { }

  public async ngOnInit() {
    this.initForm();
    const patchNumbers: string[] = await firstValueFrom(this.lolPatchService.getAll());
    this.champions = await firstValueFrom(this.championService.getAll(patchNumbers[0]));
  }

  private initForm() {
    this.battleForm = this.formBuilder.group({
      opponent1Champion: ['', [Validators.required]],
      opponent2Champion: ['', [Validators.required]]
    });
  }

  public onValueChange(event: Champion, opponent: 1 | 2) {
    if (opponent === 1) {
      this.opponent1BackgroundImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${event.name}_0.jpg`;
    }
    if (opponent === 2) {
      this.opponent2BackgroundImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${event.name}_0.jpg`;
    }
    console.log(this.opponent1BackgroundImage);
  }
}
