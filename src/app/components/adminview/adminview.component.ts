import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { User } from "src/app/classes/user";
import { Router } from "@angular/router";
import { MatTable } from "@angular/material";

@Component({
  selector: "app-adminview",
  templateUrl: "./adminview.component.html",
  styleUrls: ["./adminview.component.css"]
})
export class AdminviewComponent implements OnInit {
  public users: User[];
  public displayedColumns = ["id", "name", "pw", "save"];

  @ViewChild(MatTable) table: MatTable<User>;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.users = [];
    this.httpService.getUsers().subscribe((users: User[]) => {
      for (const user of users) {
        const newUser = new User();
        newUser.name = user.name;
        newUser.pw = user.pw;
        newUser.role = user.role;
        newUser.id = user.id;
        this.users.push(newUser);
      }
      this.table.renderRows();
    });
  }

  public logout() {
    this.httpService.logout();
    this.router.navigate(["start"]);
  }

  public setHost(id: number) {
    this.httpService.setAsHost(id).subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
