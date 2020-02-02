import { AppComponent } from "./components/app.component";
import { BrowserModule } from "@angular/platform-browser";
import { StartComponent } from "./components/start/start.component";
import { HttpService } from "./services/http.service";
import { MyHttpInterceptor } from "./services/httpInterceptor.service";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule
} from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OverviewComponent } from "./components/overview/overview.component";
import { FormsModule } from "@angular/forms";

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
    BrowserModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [HttpService, MyHttpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {}
