import { Component, OnInit, ViewChild } from "@angular/core";
import { Drink } from "src/app/classes/drink";
import { HttpService } from "src/app/services/http.service";
import { MatTable, MatSnackBar } from "@angular/material";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";

@Component({
  selector: "app-host-view",
  templateUrl: "./host-view.component.html",
  styleUrls: ["./host-view.component.css"]
})
export class HostViewComponent implements OnInit {
  public items: Drink[];
  public newDrink: Drink;
  public showNewDrink = false;
  public displayedColumns = ["id", "name", "user", "save", "delete"];
  public errorList: string[] = [];

  @ViewChild(MatTable) table: MatTable<Drink>;

  constructor(
    private httpService: HttpService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.items = [];
    this.newDrink = new Drink(null, "", "");
    this.getDrinks();
  }
  private getDrinks() {
    this.items = [];
    this.httpService.getHostItems().subscribe((items: Drink[]) => {
      for (const item of items) {
        const drink = new Drink(item.id, item.name, null);
        drink.user = item.user;
        this.items.push(drink);
      }
      this.table.renderRows();
    });
  }

  public saveNewDrink() {
    this.httpService.createDrink(this.newDrink).subscribe((result: boolean) => {
      if (result) {
        this.getDrinks();
      }
      this.table.renderRows();
    });
  }

  public save(drink: Drink) {
    this.httpService.createDrink(drink).subscribe((result: boolean) => {
      if (result) {
        this.getDrinks();
      }
    });
  }

  public delete(drinkId: number) {
    this.httpService.deleteDrink(drinkId).subscribe((result: boolean) => {
      if (result) {
        this.getDrinks();
        this.table.renderRows();
      }
    });
  }

  public finish() {
    this.httpService.finish().subscribe(
      (result: boolean) => {
        if (result) {
          this._snackBar.open(
            "Ergebnis ist gespeichert und frei gegeben",
            "X",
            {
              duration: 3000
            }
          );
        }
      },
      err => {
        this.errorList = err.error.error;
        this.openBottomSheet();
      }
    );
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, { data: this.errorList });
  }
}
