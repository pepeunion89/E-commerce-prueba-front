import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CartelconfirmacionComponent } from '../components/cartelconfirmacion/cartelconfirmacion.component';

@Injectable({
  providedIn: 'root'
})
export class ServicioVentanasService {

  constructor(private dialog: MatDialog) {}

  public abrirVentanaConfirmacionDelete(idProducto: number):Observable<any>{

    let data: any = idProducto; 
    
    let dialogRef: MatDialogRef<CartelconfirmacionComponent>;
    dialogRef = this.dialog.open(CartelconfirmacionComponent, {data});
    return dialogRef.afterClosed();

    
  }

}
