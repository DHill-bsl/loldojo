import { Component, OnInit } from '@angular/core';
import { GameFirestore } from '../game.firestore';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-battle',
  templateUrl: './create-battle.component.html',
  styleUrls: ['./create-battle.component.scss']
})
export class CreateBattleComponent implements OnInit {
  public form?: FormGroup;

  constructor(
    private gameFirestore: GameFirestore,
    private router: Router,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public async createBattle(playerCount: number) {
    if (this.form?.get('lane')?.value === 'Random') {
      const lanes = ['Top', 'Mid', 'Bot'];
      const random = Math.floor(Math.random() * lanes.length);
      this.form?.get('lane')?.setValue(lanes[random])
    }

    const host = localStorage.getItem('player')!;
    const response = await this.gameFirestore.create({
      playerCount,
      host,
      championsPerPlayer: 3,
      lane: this.form?.get('lane')?.value,
      championFormat: this.form?.get('championFormat')?.value,
      killsToWin: this.form?.get('killsToWin')?.value,
      playerData: [],
      gameStatus: 'setup'
    });
    this.router.navigate([`/battle/lobby/${response.id}`]);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      lane: 'Mid',
      championFormat: 'All',
      killsToWin: 3
    });
  }
}
