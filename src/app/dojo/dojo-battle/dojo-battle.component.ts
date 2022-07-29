import { Component, Input, OnInit } from '@angular/core';
import { DojoSetup } from '../dojo-wizard/dojo-setup';

@Component({
  selector: 'app-dojo-battle',
  templateUrl: './dojo-battle.component.html',
  styleUrls: ['./dojo-battle.component.scss']
})
export class DojoBattleComponent implements OnInit {
  @Input() public data?: DojoSetup;

  constructor() { }

  public ngOnInit(): void { }
}
