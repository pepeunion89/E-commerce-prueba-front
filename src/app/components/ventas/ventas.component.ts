import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/models/venta';
import { VentasService } from 'src/app/services/ventas.service';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  animations: [
    trigger('backgroundAnimation', [
      state('verde-oscuro', style({
        backgroundColor: '#CBEDD5'
      })),
      state('verde-claro', style({
        backgroundColor: '#97DECE'
      })),
      transition('verde-oscuro => verde-claro', animate('1s')),
      transition('verde-claro => verde-oscuro', animate('1s'))
    ])
  ],
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  @Output() listaActualizaraParaProducto:EventEmitter<Stock[]>=new EventEmitter<Stock[]>();
  @Input() idProductoEvent: number = 0;

  

  public listProductos: Producto[] = [];
  public listProductosCarrito: Venta[] = [];  
  public listStock: Stock[] = []; 
  scroll = false;

  backgroundColor = 'verde-oscuro';

  constructor(private productoService: ProductosService, 
              private stockService: StockService,
                      private cdr: ChangeDetectorRef, 
                      private ventaService: VentasService) {

    stockService.getStock().subscribe({
      next:(Response: Stock[])=>{
        this.listStock = Response;
      }, 
        error:(error: HttpErrorResponse)=>{
       alert("Error al obtener el stock");
      }
    })
                        

    setInterval(() => {      
      this.backgroundColor = this.backgroundColor === 'verde-oscuro' ? 'verde-claro' : 'verde-oscuro';
    }, 1000);

  }

  ngOnInit(): void {

    this.getProdutos();

  }

  ngOnChanges():void{



    if(this.idProductoEvent===999){

      console.log("Se actualizó pestaña VENTAS al agregar producto. "+this.idProductoEvent);

    }else{

      console.log("Cambio! "+this.idProductoEvent);
      
    }

      this.getProdutos();

      this.stockService.getStock().subscribe({
        next:(Response: Stock[])=>{
          this.listStock = Response;
        }, 
          error:(error: HttpErrorResponse)=>{
        alert("Error al obtener el stock");
        }
      })

    

  }

  // METODO CAMBIAR DE COLOR BOTON FINALIZAR 

  public getRandomColor(){
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }


  // METODO GET -----------------------------------------------
  public getProdutos():void{
    this.productoService.getProductos().subscribe({
      next:(Response: Producto[])=>{
        this.listProductos=Response;
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }


  // METODO AGREGAR AL CARRITO
  public agregarAlCarrito(pro: Producto){

    let venta: Venta = { idventa: 1, idventafecha: 1, idproducto: pro.idproducto, nompro: pro.nompro, precio: pro.precio, cantidad:1, total:pro.precio };

    let bandera = 0;

    for(let ventaArray of this.listProductosCarrito){
      if(ventaArray.nompro === venta.nompro){
        alert("¡Producto ya agregado! \nPor favor modifique la cantidad desde el carrito.");
        bandera=1;
      }      
    }

    if(bandera === 0){
      
      this.listProductosCarrito.push(venta);      

    }
    
  }

  // METODO SUMAR TOTAL
  public getTotalCarrito(){

    let total = 0;

    for(let venta of this.listProductosCarrito){
      total += (venta.precio * venta.cantidad);
    }
    return total;
  }

 
  // METODOS PARA SUBIR Y BAJAR CANTIDADES DE CADA PRODUCTO EN CARRITO

  public decreaseQuantity(id: number, nomPro: String) {
    const input = document.getElementById("quantity-"+id) as HTMLInputElement;
    if(input){
      if(parseInt(input.value) > 0) {
      input.value = (parseInt(input.value) - 1).toString();

        for(let venta of this.listProductosCarrito){
          if(venta.idproducto === id){
            venta.cantidad = parseInt(input.value);
          }
        }
      
      //document.getElementById("celda-precio-carrito")!.innerHTML="$"+(transaction.cost*parseInt(input.value)).toString();
      }
    }
  
  }
  
  public increaseQuantity(id: number, nomPro: String) {
    const input = document.getElementById("quantity-"+id) as HTMLInputElement;
    input.value = (parseInt(input.value) + 1).toString();
      for(let venta of this.listProductosCarrito){

        if(venta.idproducto === id){
          venta.cantidad = parseInt(input.value);
        }
      }
   // document.getElementById("celda-precio-carrito")!.innerHTML="$"+(transaction.cost*parseInt(input.value)).toString();
  }


   // METODO ELIMINAR DEL CARRITO
   public eliminarDelCarrito(venta: Venta){
    
      for(let producto of this.listProductosCarrito){
        if(producto.nompro === venta.nompro){
          this.listProductosCarrito.splice(this.listProductosCarrito.indexOf(producto), 1);
        }
      }
          
   }

   // METODO GUARDAR VENTA
   public guardarVenta(){

      let checkStock: number = 0;
      let listStockAUpdatear:Stock[] = []

      // Checkeamos si alguno de los productos a vender supera el stock solicitado
      for(let ventaRegistrada of this.listProductosCarrito){

        for(let producto of this.listStock){

          if(ventaRegistrada.nompro == producto.nompro){

            if(ventaRegistrada.cantidad>producto.cantidad){

              checkStock = 1;

            }else{
              let stockAct: Stock = producto;
              stockAct.cantidad= producto.cantidad - ventaRegistrada.cantidad;
              console.log(stockAct.nompro+" tiene ahora "+stockAct.cantidad);
              listStockAUpdatear.push(stockAct);
            }

          }


        }
      }
      

      // SI el check cambió, es porque no hay stock disponible en 1 o mas productos entonces no realiza venta
      if(checkStock==1){
        alert('No hay suficiente cantidad en inventario para realizar la compra');
      }
      // SINO realiza la venta
      else{
        let date: Date = new Date();
        let mes: String =(date.getMonth()+1).toString();
        let dia: String =date.getDate().toString();
        let hora: String = date.getHours().toString();
        let minutos: String = date.getMinutes().toString();
        let segundos: String = date.getSeconds().toString();


        if(date.getMonth()<10){
          mes = "0"+(date.getMonth()+1).toString();
        }

        if(date.getDay()<10){
          dia = "0"+date.getDate().toString();
        }

        if(date.getHours()<10){
          hora = "0"+date.getHours().toString();
        }

        if(date.getMinutes()<10){
          minutos = "0"+date.getMinutes().toString();
        }

        if(date.getSeconds()<10){
          segundos = "0"+date.getSeconds().toString();
        }

        let idDateVenta: number = parseInt(date.getFullYear().toString()+mes+dia+hora+minutos+segundos);

        for(let ventaRegistrada of this.listProductosCarrito){
          
          ventaRegistrada.idventafecha = idDateVenta;

          this.ventaService.guardarVenta(ventaRegistrada).subscribe({
            
            next:(Response: Venta)=>{
              console.log("Venta de "+Response.nompro+" registrada.");
            },
            error:(error: HttpErrorResponse)=>{
              alert(error.message);
            }

            }
          )

        }

        for(let stock of listStockAUpdatear){
          this.stockService.updateStock(stock).subscribe({
            next:(Response: Stock)=>{
              console.log("Stock de "+Response.nompro+" actualizado.");
            },
            error:(error: HttpErrorResponse)=>{
              alert(error.message);
            }
          });
        }

        

        this.stockService.getStock().subscribe({
          next:(Response: Stock[])=>{
            let listaActualizada = Response;
            this.listaActualizaraParaProducto.emit(listaActualizada);
            console.log(listaActualizada);
            
          },
          error:(error:HttpErrorResponse)=>{
            console.log("Error al actualizar stock luego de venta");
          }
        })
        
        

        this.listProductosCarrito = [];


        alert("¡Venta registrada!");
      }
      
      
   }


   // METODO PARA VALIDAR INGRESO DE NUMEROS TIPO PRECIO O CANTIDADES POR KILOS

   public validarCantidad(event: Event, idproducto: number) {
    const input = event.target as HTMLInputElement;
    const inputASetear = document.getElementById("quantity-"+idproducto) as HTMLInputElement;
        
    console.log(input);
    const pattern = /^\d+(?:\.\d{0,2})?$/;

      if (!pattern.test(input.value)) {
        input.value = input.value.substring(0, input.value.length - 1);
      }
  
      if (input.value.length<1){
        inputASetear.value = "0";
      }

      for(let venta of this.listProductosCarrito){
        if(venta.idproducto === idproducto){
          venta.cantidad = parseFloat(inputASetear.value);
        }
      }

      this.cdr.detectChanges();

  }

    

}
