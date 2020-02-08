import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { DrinkResult } from "src/app/classes/drinkValue";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.component.html",
  styleUrls: ["./archive.component.css"]
})
export class ArchiveComponent implements OnInit {
  public archiveList: string[];
  public displayedColumns = ["name", "show", "set"];
  public jsontext = "";
  public showFile = false;
  public archiveResult: DrinkResult[];
  public showResult: boolean;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.httpService.getArchive().subscribe((archive: string[]) => {
      this.archiveList = archive;
    });
  }
  public logout() {
    this.httpService.logout();
    this.router.navigate(["start"]);
  }

  public showError(msg: string) {
    this._snackBar.open(msg, "X", {
      duration: 1000
    });
  }

  public getFileResult(fileName: string) {
    this.httpService
      .getFileResult(fileName)
      .subscribe((fileResult: DrinkResult[]) => {
        this.archiveResult = fileResult;
        this.showResult = true;
      });
  }

  public getFile(fileName: string) {
    this.httpService.getFile(fileName).subscribe((archive: {}) => {
      this.jsontext = JSON.stringify(archive, null, 1);
      this.showFile = true;
    });
  }
}
