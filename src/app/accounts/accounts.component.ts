import { Component, OnInit } from '@angular/core';
import { AccountsFirestore } from '../services/accounts.firestore';
import { Account } from '../models/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  public accounts?: Account[] = undefined;

  constructor(private accountsFirestore: AccountsFirestore) { }

  public ngOnInit(): void {
    void this.getAll();
  }

  private async getAll() {
    this.accounts = await this.accountsFirestore.getAll();
  }

  private async getName(name: string) {
    const account = await this.accountsFirestore.getByName(name);
    console.log(account);
  }
}
