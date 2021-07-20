import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate {

  private roleStr = {
    "1": "user",
    // "2": "admin"
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.auth.getSessionStorage();
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/')
      return false
    }
    if (route.data && route.data.roles && !route.data.roles.includes(this.roleStr[this.auth.role])) {
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
