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
  MatTableModule,
  MatBottomSheetModule,
  MatListModule,
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OverviewComponent } from "./components/overview/overview.component";
import { FormsModule } from "@angular/forms";
import { AuthGuardService } from "./services/auth-guard.service";
import { HostViewComponent } from "./components/host-view/host-view.component";
import { AdminviewComponent } from "./components/adminview/adminview.component";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";

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
  {
    path: "admin",
    component: AdminviewComponent,
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
    HostViewComponent,
    AdminviewComponent,
    BottomSheetComponent
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
    MatTableModule,
    MatBottomSheetModule,
    MatListModule
  ],
  providers: [
    HttpService,
    MyHttpInterceptor,
    MatBottomSheet,
    ,
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
