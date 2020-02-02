import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
  public name: string;

  ngOnInit() {}
  constructor(private router: Router) {}

  public showStart() {
    if (!this.name || this.name.length === 0) {
      return;
    }
    this.router.navigate(["overview"]);
  }
}
