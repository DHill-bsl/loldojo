import { Component, OnInit } from '@angular/core';
import { AccountsFirestore } from '../services/accounts.firestore';
import { Account } from '../models/account';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public accounts: Account[] = [];
  public selectedAccount?: string = undefined;
  constructor(
    private readonly accountsFirestore: AccountsFirestore,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    void this.getAccounts();
  }

  private async getAccounts() {
    this.accounts = await this.accountsFirestore.getAll();
  }

  public proceed(player: string) {
    localStorage.setItem('player', player);
    void this.router.navigate([this.route.snapshot.queryParams['returnUrl']]);
  }
}
