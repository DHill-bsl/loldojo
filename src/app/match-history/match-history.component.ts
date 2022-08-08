import { Component, OnInit } from '@angular/core';
import { BattleSummary } from '../battle/battle-summary';
import { MatchHistoryFirestore } from '../services/match-history.firestore';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {
  public displayedColumns = ['team1', 'team2', 'winners', 'kills', 'timeElapsed', 'lane', 'championFormat'];
  public dataSource: BattleSummary[] = [];
  constructor(private battleFirestore: MatchHistoryFirestore) { }

  public async ngOnInit() {
    this.dataSource = await this.battleFirestore.getBattles();
    console.log(this.dataSource);
  }
}
