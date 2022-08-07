import { Component } from '@angular/core';

@Component({
  selector: 'app-invite-link',
  templateUrl: './invite-link.component.html',
  styleUrls: ['./invite-link.component.scss']
})
export class InviteLinkComponent {
  constructor() { }

  public get gameLink() {
    return window.location.href;
  }
}
