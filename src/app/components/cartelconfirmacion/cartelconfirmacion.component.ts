import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cartelconfirmacion',
  templateUrl: './cartelconfirmacion.component.html',
  styleUrls: ['./cartelconfirmacion.component.scss']
})
export class CartelconfirmacionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CartelconfirmacionComponent>) { }

  ngOnInit(): void {
  }

  public confirmarEliminacion(): void{
    this.dialogRef.close('confirma');
  }

  public cancelarEliminacion(): void{
    this.dialogRef.close();
  }

}
