import { Component, OnInit } from "@angular/core";
import { DrinkValue, DrinkResult } from "src/app/classes/drinkValue";
import { HttpService } from "src/app/services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  public data: DrinkValue[];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public yAxisLabel = "Getränk";
  public showYAxisLabel = true;
  public xAxisLabel = "Note";

  public colorScheme = {
    domain: ["#A10A28"]
  };

  constructor(private httpService: HttpService, private router: Router) {}

  public ngOnInit(): void {
    this.httpService.getResult().subscribe((result: DrinkResult[]) => {
      if (result && result.length > 0) {
        this.data = [];
        for (const drink of result) {
          const ele = new DrinkValue();
          ele.name = drink.name + " von " + drink.user;
          ele.value = drink.value;
          this.data.push(ele);
        }
      }
    });
  }

  public logout() {
    this.httpService.logout();
    this.router.navigate(["start"]);
  }
  // public onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // public   onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // public onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
