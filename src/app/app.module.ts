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
  MatSnackBarModule,
  MatTableModule
} from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OverviewComponent } from "./components/overview/overview.component";
import { FormsModule } from "@angular/forms";
import { AuthGuardService } from "./services/auth-guard.service";
import { HostViewComponent } from "./components/host-view/host-view.component";

const appRoutes: Routes = [
  { path: "start", component: StartComponent },
  {
    path: "overview",
    component: OverviewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "host",
    component: HostViewComponent,
    canActivate: [AuthGuardService]
  },
  { path: "", redirectTo: "/start", pathMatch: "full" },
  { path: "**", component: StartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    OverviewComponent,
    HostViewComponent
  ],
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
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [HttpService, MyHttpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {}
