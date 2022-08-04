import { Component, OnInit } from '@angular/core';
import { BattleFirestore } from "../services/battle.firestore";
import { BattleSummary } from "../dojo/battle-summary";

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {
  public displayedColumns = ['team1', 'team2', 'winners', 'kills', 'timeElapsed', 'lane', 'championFormat'];
  public dataSource: BattleSummary[] = [];
  constructor(private battleFirestore: BattleFirestore) { }

  public async ngOnInit() {
    this.dataSource = await this.battleFirestore.getBattles();
    console.log(this.dataSource);
  }
}
