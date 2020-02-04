import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot) {
    if (route.url[0].path === "host") {
      if (!this.httpService.isHost) {
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
