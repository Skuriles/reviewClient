import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
  public name = "";

  constructor(private router: Router) {}
  public ngOnInit() {}

  public showStart() {
    if (!this.name || this.name.length === 0) {
      return;
    }
    this.router.navigate(["overview"]);
  }

  public checkName() {
    return !this.name || this.name.length === 0;
  }
}
