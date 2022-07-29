import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle-container',
  templateUrl: './battle-container.component.html',
  styleUrls: ['./battle-container.component.scss']
})
export class BattleContainerComponent implements OnInit {
  public quotes = [
    'You may stumble and fall, but you shall rise again.',
    'Know thy self, know thy enemy. A thousand battles, a thousand victories.',
    'Strike against war, for without you no battles can be fought.',
    'Pick your battle, big enough to matter, small enough to win.',
    'If you know the enemy and know yourself, you need not fear the results of a hundred battles.',
    'May you choose a worthy opponent.',
    'Cry havoc, and let slip the dogs of war!',
    'Once more unto the breach, dear friends, once more.',
    'Fight your foes in the  field, not be burnt in your house.',
    'Fear not death, for the hour of your doom is set and non may escape it.',
    `Don't live with shame, die with honour`,
    'Bravery is half the victory.',
    'A hungry wolf is bound to wage a hard battle.',
    'Only death is  certain.'
  ];

  public selectedQuote = '';

  constructor() {
  }

  ngOnInit(): void {
    const random = Math.floor(Math.random() * this.quotes.length);
    this.selectedQuote = this.quotes[random];
  }
}
