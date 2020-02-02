import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Drink } from "../classes/drink";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getItems() {
    const nodeUrl = "api/getItems";
    const body = "";
    return this.postRequest(nodeUrl, body);
  }

  public addUser(name: string) {
    const nodeUrl = "api/addUser";
    const body = { name };
    return this.postRequest(nodeUrl, body);
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
    return this.http.post(nodeUrl, body);
  }
}
