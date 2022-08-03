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
  public mode: '1v1' | '2v2' = '1v1';
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
      opponent3: [''],
      opponent4: [''],
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

  public setMode(mode: '1v1' | '2v2') {
    this.mode = mode;

    if (this.mode === '1v1') {
      this.form?.get('opponent3')?.setValue(undefined);
      this.form?.get('opponent3')?.removeValidators(Validators.required);
      this.form?.get('opponent4')?.setValue(undefined);
      this.form?.get('opponent4')?.removeValidators(Validators.required);
    }
    if (this.mode === '2v2') {
      this.form?.get('opponent3')?.setValidators(Validators.required);
      this.form?.get('opponent4')?.setValidators(Validators.required);
    }
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
