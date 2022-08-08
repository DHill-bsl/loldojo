import { Injectable } from "@angular/core";
import { addDoc, collection, Firestore, getDocs } from "@angular/fire/firestore";
import { CollectionReference, DocumentData } from "@firebase/firestore";
import { BattleSummary } from '../battle/battle-summary';


@Injectable()
export class MatchHistoryFirestore {
  private readonly docPath = 'match-history';
  private readonly battlesCollectionRef: CollectionReference<DocumentData> = collection(this.db, this.docPath);

  constructor(private readonly db: Firestore) { }

  public async getBattles(): Promise<BattleSummary[]> {
    const querySnapshot = await getDocs(this.battlesCollectionRef);
    return querySnapshot.docs.map(x => {
      return x.data() as BattleSummary;
    });
  }

  public async saveBattle(battle: BattleSummary) {
    return await addDoc(collection(this.db, this.docPath), battle);
  }
}

