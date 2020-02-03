import { Component, OnInit, ViewChild } from "@angular/core";
import { Drink } from "src/app/classes/drink";
import { HttpService } from "src/app/services/http.service";
import { MatSnackBar, MatTable } from "@angular/material";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit {
  public items: Drink[];
  public isFree = false;
  public displayedColumns = ["id", "value", "comment", "save"];

  @ViewChild(MatTable) table: MatTable<Drink>;

  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.isFree) {
      this.displayedColumns = [
        "id",
        "value",
        "comment",
        "name",
        "user",
        "save"
      ];
    }
    this.items = [];
    this.httpService.getItems().subscribe((items: Drink[]) => {
      for (const item of items) {
        const drink = new Drink(item.id, item.name, null);
        this.items.push(drink);
      }
      this.table.renderRows();
    });
  }

  public save(item: Drink) {
    this.httpService.saveDrink(item).subscribe((result: boolean) => {
      if (result) {
        this.showError("Gespeichert");
      } else {
        this.showError("Speichern fehlgeschlagen");
      }
    });
  }

  public showError(msg: string) {
    this._snackBar.open(msg, "X", {
      duration: 1000
    });
  }
}
