import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { DialogData } from "src/app/classes/dialogData";

@Component({
  selector: "app-dialog-base",
  templateUrl: "./dialog-base.component.html",
  styleUrls: ["./dialog-base.component.css"]
})
export class DialogBaseComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<DialogBaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
