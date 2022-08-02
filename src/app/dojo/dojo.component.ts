import { Component, OnInit } from '@angular/core';
import { DojoSetup } from "./dojo-setup";

@Component({
  selector: 'app-dojo',
  templateUrl: './dojo.component.html',
  styleUrls: ['./dojo.component.scss']
})
export class DojoComponent implements OnInit {
  public data?: DojoSetup = { lane: "Mid", championFormat: "Marksman", opponent1: 'Irea', opponent2: 'Wachati' };
  constructor() { }

  public ngOnInit(): void {
  }
}
