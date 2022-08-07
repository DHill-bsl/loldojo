import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';
import { addDoc, collection, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { BattleConfig } from './battle-config';

@Injectable()
export class GameFirestore {
  public readonly docPath = 'game';
  public readonly gameCollectionRef: CollectionReference<DocumentData> = collection(this.db, this.docPath);
  constructor(public readonly db: Firestore) { }

  public async create(config: BattleConfig) {
    return await addDoc(collection(this.db, this.docPath), config);
  }

  public async get(id: string): Promise<BattleConfig> {
    const docRef = doc(this.db, this.docPath, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as BattleConfig;
    } else {
      return Promise.reject();
    }
  }

  public async update(id: string, battleConfig: BattleConfig) {
    const documentRef = doc(this.db, this.docPath, id);
    await updateDoc(documentRef, {
      ...battleConfig
    });
  }
}
