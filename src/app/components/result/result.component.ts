import { Component, OnInit, Input } from "@angular/core";
import {
  DrinkValue,
  DrinkResult,
  DrinkColor
} from "src/app/classes/drinkValue";
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
  public noArchive = true;
  public customColors: DrinkColor[];

  public colorScheme = {
    domain: ["#A10A28"]
  };

  @Input() archiveData: DrinkResult[];

  constructor(private httpService: HttpService, private router: Router) {}

  public ngOnInit(): void {
    this.customColors = [];
    this.createData();
  }

  private createData() {
    if (this.archiveData) {
      this.data = [];
      let count = 0;
      this.noArchive = false;
      for (const drink of this.archiveData) {
        count = this.createResultData(drink, count, this.archiveData);
      }
    } else {
      this.httpService.getResult().subscribe((result: DrinkResult[]) => {
        if (result && result.length > 0) {
          this.data = [];
          let count = 0;
          for (const drink of result) {
            count = this.createResultData(drink, count, result);
          }
        }
      });
    }
  }

  private createResultData(
    drink: DrinkResult,
    count: number,
    result: DrinkResult[]
  ) {
    const ele = new DrinkValue();
    ele.name = drink.name + " von " + drink.user;
    ele.value = drink.value;
    this.data.push(ele);
    if (count === 0) {
      const newColor = new DrinkColor();
      newColor.name = ele.name;
      newColor.value = "#5AA454";
      this.customColors.push(newColor);
    } else if (count === 1 || count === 2) {
      const newColor = new DrinkColor();
      newColor.name = ele.name;
      newColor.value = "#C7B42C";
      this.customColors.push(newColor);
    } else if (result.length - 1) {
      const newColor = new DrinkColor();
      newColor.name = ele.name;
      newColor.value = "#A10A28";
      this.customColors.push(newColor);
    } else {
      const newColor = new DrinkColor();
      newColor.name = ele.name;
      newColor.value = "#209C82";
      this.customColors.push(newColor);
    }
    count++;
    return count;
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
