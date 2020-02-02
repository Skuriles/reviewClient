import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MzInputModule, MzButtonModule, MzSelectModule } from "ngx-materialize";

import { AppComponent } from "./components/app.component";
import { StartComponent } from "./components/start/start.component";
import { OverviewComponent } from "./overview/overview.component";
import { HttpService } from "./services/http.service";
import { MyHttpInterceptor } from "./services/httpInterceptor.service";

const appRoutes: Routes = [
  { path: "start", component: StartComponent },
  { path: "overview", component: OverviewComponent },
  { path: "", redirectTo: "/start", pathMatch: "full" },
  { path: "**", component: StartComponent }
];

@NgModule({
  declarations: [AppComponent, StartComponent, OverviewComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    MzSelectModule,
    BrowserModule,
    MzInputModule,
    MzButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [HttpService, MyHttpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {}
