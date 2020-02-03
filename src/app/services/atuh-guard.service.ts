import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AtuhGuardService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  public canActivate() {
    if (this.httpService.token && this.httpService.token.length > 0) {
      return true;
    }
    this.router.navigate(["start"]);
  }
}
