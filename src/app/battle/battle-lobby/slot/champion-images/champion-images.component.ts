import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Champion } from '../../../champion.service';

@Component({
  selector: 'app-champion-images',
  templateUrl: './champion-images.component.html',
  styleUrls: ['./champion-images.component.scss']
})
export class ChampionImagesComponent implements OnInit, OnChanges {
  private _champions: Champion[] = [];

  public get champions() {
    return this._champions;
  }

  @Input() public set champions(value: Champion[]) {
    if (!this.isSameChampions(this.champions, value)) {
      this._champions = value;
    }
  }

  @Input() public selectedChampion = '';
  @Input() public editable = false;

  @Output() public selected = new EventEmitter<Champion>();

  public championImages: string[] = [];
  hoverIndex: number = -1;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['champions']) {
      if (changes['champions'].firstChange) {
        this.generateChampionImages();
        return;
      }

      if (!this.isSameChampions(this.champions, changes['champions'].currentValue)) {
        this.generateChampionImages();
      }
    }
  }

  private generateChampionImages() {
    this.championImages = [];

    this.champions?.forEach((champion) => {
      const championImageName = champion.image.full.slice(0, -4);
      this.championImages.push(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championImageName}_0.jpg`);
    });
  }

  private isSameChampions(champs1: Champion[], champs2: Champion[]) {
    const champs1Names = champs1.map(x => x.name);
    const champs2Names = champs2.map(x => x.name);
    return (JSON.stringify(champs1Names) === JSON.stringify(champs2Names));
  }
}
