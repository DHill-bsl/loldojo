import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { GameFirestore } from './game.firestore';
import { BattleConfig } from './battle-config';

@Injectable()
export class GameResolver implements Resolve<Observable<BattleConfig>> {
  constructor(
    private router: Router,
    private gameFirestore: GameFirestore) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<BattleConfig>> | Promise<Observable<BattleConfig>> | Observable<BattleConfig> {
    const gameId = route.params['id'];
    return from(this.gameFirestore.get(gameId));
  }
}
