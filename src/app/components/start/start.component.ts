import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";
import { MatSnackBar } from "@angular/material";
import { TokenResult } from "src/app/classes/tokenResult";
import { User } from "src/app/classes/user";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
  public name = "";
  public pw = "";
  public errorMsg = "test";
  private tokenName = this.httpService.tokenName;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) {}
  public ngOnInit() {
    if (
      localStorage.getItem(this.tokenName) !== null &&
      localStorage.getItem(this.tokenName) !== ""
    ) {
      this.httpService.token = localStorage.getItem(this.tokenName);
      this.httpService.checkToken().subscribe((result: boolean) => {
        if (result) {
          this.httpService.checkRole().subscribe((roleResult: { role }) => {
            this.httpService.role = roleResult.role;
            this.router.navigate(["overview"]);
          });
        } else {
          localStorage.setItem(this.tokenName, null);
          this.httpService.token = null;
        }
      });
    }
  }

  public showStart() {
    if (
      !this.name ||
      this.name.length === 0 ||
      !this.pw ||
      this.pw.length === 0
    ) {
      return;
    }
    const user = new User();
    user.name = this.name;
    user.pw = this.pw;
    this.httpService.login(user).subscribe((result: TokenResult) => {
      if (result) {
        this.httpService.token = result.token;
        localStorage.setItem(this.tokenName, result.token);
        this.httpService.checkRole().subscribe((roleResult: { role }) => {
          this.httpService.role = roleResult.role;
          this.router.navigate(["overview"]);
        });
      } else {
        localStorage.setItem(this.tokenName, null);
        this.httpService.token = null;
        this.showError("Benutzer gibt es schon");
      }
    });
  }

  public checkName() {
    return !this.name || this.name.length === 0;
  }

  public showError(msg: string) {
    this._snackBar.open(msg, "X", {
      duration: 3000
    });
  }
}
