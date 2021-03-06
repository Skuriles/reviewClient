import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Drink } from "../classes/drink";
import { User } from "../classes/user";
import { MyConstants } from "../classes/constants";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public token: string;
  public role = MyConstants.roles.drinker;
  public readonly tokenName = "ichbineinteamToken";
  constructor(private http: HttpClient) {}

  public logout() {
    this.token = null;
    this.role = MyConstants.roles.drinker;
    localStorage.removeItem(this.tokenName);
  }

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

  public checkRole() {
    const nodeUrl = "api/checkRole";
    return this.postAuthRequest(nodeUrl, "");
  }
  public getItems() {
    const nodeUrl = "api/getItems";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public getHostItems() {
    const nodeUrl = "api/getHostItems";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public setAsHost(id: number) {
    const nodeUrl = "api/setUserAsHost";
    const body = { id };
    return this.postAuthRequest(nodeUrl, body);
  }

  public getUsers() {
    const nodeUrl = "api/getUserList";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public createDrink(newDrink: Drink) {
    const nodeUrl = "api/createDrink";
    const body = newDrink;
    return this.postAuthRequest(nodeUrl, body);
  }

  public deleteDrink(drinkId: number) {
    const nodeUrl = "api/deleteDrink";
    const body = { drinkId };
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

  public finish() {
    const nodeUrl = "api/finish";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public checkResult() {
    const nodeUrl = "api/checkResult";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public getResult() {
    const nodeUrl = "api/getResult";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public resetAll() {
    const nodeUrl = "api/resetAll";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public getArchive() {
    const nodeUrl = "api/getArchive";
    const body = "";
    return this.postAuthRequest(nodeUrl, body);
  }

  public getFile(fileName: string) {
    const nodeUrl = "api/getFile";
    const body = { fileName };
    return this.postAuthRequest(nodeUrl, body);
  }

  public getFileResult(fileName: string) {
    const nodeUrl = "api/getFileResult";
    const body = { fileName };
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
