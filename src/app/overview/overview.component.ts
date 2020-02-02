import { Component, OnInit } from "@angular/core";
import { Drink } from "../classes/drink";
import { HttpService } from "../services/http.service";
import { MzSelectModule } from "ngx-materialize";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit {
  public items: Drink[];
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
