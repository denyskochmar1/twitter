import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ){
    let canActivatePage = Boolean(sessionStorage.getItem('authorized'));
    if (!canActivatePage) {
      this.router.navigate(['/']);
    }
    return canActivatePage;
  }
}