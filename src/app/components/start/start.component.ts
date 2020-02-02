import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
  public name = "";
  public errorMsg = "test";

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) {}
  public ngOnInit() {}

  public showStart() {
    if (!this.name || this.name.length === 0) {
      return;
    }
    this.httpService.addUser(this.name).subscribe((result: boolean) => {
      if (result) {
        this.router.navigate(["overview"]);
      } else {
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
