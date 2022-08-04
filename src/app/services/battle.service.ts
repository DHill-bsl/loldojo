import { Injectable } from "@angular/core";
import { BattleSummary } from "../dojo/battle-summary";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";


@Injectable()
export class BattleService {
  constructor(private readonly db: Firestore) { }

  public async saveBattle(battle: BattleSummary) {
    return await addDoc(collection(this.db, 'battles'), battle);
  }
}

