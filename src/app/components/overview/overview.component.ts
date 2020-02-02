import { Component, OnInit } from "@angular/core";
import { Drink } from "src/app/classes/drink";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit {
  public items: Drink[];
  public value: any;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.items = [];
    this.httpService.getItems().subscribe((items: Drink[]) => {
      for (const item of items) {
        const drink = new Drink(item.id, item.name, null);
        this.items.push(drink);
      }
    });
  }
}
