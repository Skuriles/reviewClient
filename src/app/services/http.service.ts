import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Drink } from "../classes/drink";
import { User } from "../classes/user";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public token: string;
  public isHost = false;
  constructor(private http: HttpClient) {}

  public login(user: User) {
    const nodeUrl = "api/login";
    const body = { user: user };
    return this.postRequest(nodeUrl, body);
  }

  public checkToken() {
    const nodeUrl = "api/checkToken";
    const body = { token: this.token };
    return this.postRequest(nodeUrl, body);
  }

  public checkHost() {
    const nodeUrl = "api/checkHost";
    return this.postAuthRequest(nodeUrl, "");
  }
  public getItems() {
    const nodeUrl = "api/getItems";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public addUser(user: User) {
    const nodeUrl = "api/addUser";
    const body = { user: user };
    return this.postAuthRequest(nodeUrl, body);
  }

  public saveDrink(item: Drink) {
    const nodeUrl = "api/saveDrink";
    const body = { item };
    return this.postAuthRequest(nodeUrl, body);
  }
  // default http requests
  private postRequest(nodeUrl: string, body: any) {
    return this.http.post(nodeUrl, body);
  }

  private getAuthRequest(nodeUrl: string) {
    return this.http.get(nodeUrl);
  }

  private postAuthRequest(nodeUrl: string, body: any) {
    return this.http.post(nodeUrl, body, {
      headers: new HttpHeaders().set("Authorization", this.token)
    });
  }
}
