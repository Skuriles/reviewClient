import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { HttpService } from "./http.service";
import { MyConstants } from "../classes/constants";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (state.url === "host") {
      if (this.httpService.role !== MyConstants.roles.host) {
        this.router.navigate(["start"]);
      }
      return true;
    }
    if (route.url[0].path === "admin") {
      if (this.httpService.role !== MyConstants.roles.admin) {
        this.router.navigate(["start"]);
      }
      return true;
    }
    if (this.httpService.token && this.httpService.token.length > 0) {
      return true;
    }
    this.router.navigate(["start"]);
  }
}
