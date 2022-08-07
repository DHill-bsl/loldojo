import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const player = localStorage.getItem('player');

    if (player) {
      return true;
    }

    console.log(state.url);
    void this.router.navigate(['login'], { queryParams: { returnUrl: state.url} });
    return false;
  }
}
