import { Component, OnInit, ViewChild } from "@angular/core";
import { Drink } from "src/app/classes/drink";
import { HttpService } from "src/app/services/http.service";
import { MatTable } from "@angular/material";

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

  @ViewChild(MatTable) table: MatTable<Drink>;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.items = [];
    this.newDrink = new Drink(null, "", "");
    this.getDrinks();
  }
  private getDrinks() {
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
}
