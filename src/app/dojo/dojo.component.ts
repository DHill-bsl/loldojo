import { Component, OnInit } from '@angular/core';
import { DojoSetup } from './dojo-wizard/dojo-setup';

@Component({
  selector: 'app-dojo',
  templateUrl: './dojo.component.html',
  styleUrls: ['./dojo.component.scss']
})
export class DojoComponent implements OnInit {
  public data?: DojoSetup = undefined;
  constructor() { }

  public ngOnInit(): void {
  }
}
