import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/models/stock';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnChanges {
  
  @Input() fromContainerMostrarPanel: String = '';

  public stockActualizado: Stock[]=[];
  public idProductoEvent: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.fromContainerMostrarPanel!=''){
      
      switch(this.fromContainerMostrarPanel){
        case "ventas": {
          const ventasApp= document.getElementById('contenedor-movil-id');
          ventasApp!.style.transform = "translateX(0%)";
          break;
        }

        case "productos": {
          const precioskApp= document.getElementById('contenedor-movil-id');
          precioskApp!.style.transform = "translateX(-100%)";
          break;
        }

        case "detalles": {
          const detallesApp= document.getElementById('contenedor-movil-id');
          detallesApp!.style.transform = "translateX(-200%)";
          break;
        }

      }

    }
  }

  public actualizarStock(stock: Stock[]){
    this.stockActualizado=stock;
    console.log("A CONTAINER LLEGA ASI:");
    console.log(stock);
  }

  public actualizarTablaVentas(idProductoEvent: number){
    this.idProductoEvent = idProductoEvent;
    console.log(this.idProductoEvent);
  }


}
