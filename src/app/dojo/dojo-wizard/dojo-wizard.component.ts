import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsFirestore } from '../../services/accounts.firestore';
import { Account } from '../../models/account';
import { DojoSetup } from "../dojo-setup";

@Component({
  selector: 'app-dojo-wizard',
  templateUrl: './dojo-wizard.component.html',
  styleUrls: ['./dojo-wizard.component.scss']
})
export class DojoWizardComponent implements OnInit {
  public accounts?: Account[] = undefined;
  public form?: FormGroup;
  @Output() public complete = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private accountsFirestore: AccountsFirestore) { }

  public ngOnInit(): void {
    void this.loadAccounts();

    const opponent1 = localStorage.getItem('opponent1');

    this.form = this.formBuilder.group({
      opponent1: [opponent1 ? opponent1 : '', Validators.required],
      opponent2: ['', Validators.required],
      lane: 'Mid',
      championFormat: 'All',
    });
  }

  public async loadAccounts() {
    this.accounts = await this.accountsFirestore.getAll();
  }

  public onOpponent1Change(event: string) {
    localStorage.setItem('opponent1', event);
  }

  public onComplete() {
    this.complete.emit(this.getData());
  }

  private getData() {
    if (this.form?.get('lane')?.value === 'Random') {
      const lanes = ['Top', 'Mid', 'Bot'];
      const random = Math.floor(Math.random() * lanes.length);
      this.form?.get('lane')?.setValue(lanes[random])
    }

    return this.form?.getRawValue() as DojoSetup;
  }
}
