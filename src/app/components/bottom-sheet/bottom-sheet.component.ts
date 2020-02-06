import { Component, OnInit, Inject } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material";
import { HostViewComponent } from "../host-view/host-view.component";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./bottom-sheet.component.html",
  styleUrls: ["./bottom-sheet.component.css"]
})
export class BottomSheetComponent implements OnInit {
  // @Input() errors: string[];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<HostViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    if (Object.keys(this.data).length == 0) {
      this.data = [];
    }
  }

  ngOnInit(): void {
    const i = 0;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
