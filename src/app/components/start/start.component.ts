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

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) {}
  public ngOnInit() {
    if (
      localStorage.getItem("ichbineinteamToken") !== null &&
      localStorage.getItem("ichbineinteamToken") !== ""
    ) {
      this.httpService.token = localStorage.getItem("ichbineinteamToken");
      this.httpService.checkToken().subscribe((result: boolean) => {
        if (result) {
          this.httpService.checkHost().subscribe((isHost: boolean) => {
            this.httpService.isHost = isHost;
          });
          this.router.navigate(["overview"]);
        } else {
          localStorage.setItem("ichbineinteamToken", null);
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
        localStorage.setItem("ichbineinteamToken", result.token);
        this.router.navigate(["overview"]);
        this.httpService.checkHost().subscribe((isHost: boolean) => {
          this.httpService.isHost = isHost;
        });
      } else {
        localStorage.setItem("ichbineinteamToken", null);
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
