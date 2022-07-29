import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from '@firebase/firestore';
import { Account } from '../models/account';

@Injectable()
export class AccountsFirestore {
  private readonly docPath = 'accounts';
  private readonly accountsCollectionRef: CollectionReference<DocumentData> = collection(this.db, this.docPath);

  constructor(private  readonly db: Firestore) { }

  public initAccounts() {
    void setDoc(doc(this.accountsCollectionRef, "Irea"), { name: 'Irea' });
    void setDoc(doc(this.accountsCollectionRef, "PurpleYuno"), { name: 'PurpleYuno' });
    void setDoc(doc(this.accountsCollectionRef, "Arcanism"), { name: 'Arcanism' });
    void setDoc(doc(this.accountsCollectionRef, "Wachati"), { name: 'Wachati' });
    void setDoc(doc(this.accountsCollectionRef, "Saltsyre"), { name: 'Saltsyre' });
  }

  public async getAll() {
    const querySnapshot = await getDocs(this.accountsCollectionRef);
    return querySnapshot.docs.map(x => {
      return x.data() as Account;
    });
  }

  public async getByName(name: string): Promise<Account | undefined> {
    const docRef = doc(this.db, this.docPath, name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Account;
    } else {
      return Promise.resolve(undefined);
    }
  }
}
