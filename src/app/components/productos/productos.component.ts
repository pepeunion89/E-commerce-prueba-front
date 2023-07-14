import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Producto } from 'src/app/models/producto';
import { ProductoStock } from 'src/app/models/productostock';
import { Stock } from 'src/app/models/stock';
import { ProductosService } from 'src/app/services/productos.service';
import { StockService } from 'src/app/services/stock.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @Input() listStockActualizado:Stock[]=[];

  public listProductos: Producto[] = [];
  public listStock: Stock[] = [];
  public listProductoStock: ProductoStock[] = [];
  banderaEdit = 0;
  comparador = 1;
  

  constructor(private productoService: ProductosService, private stockService: StockService, private cdr: ChangeDetectorRef) {
   
   }

  ngOnInit(): void {

    this.getProdutos();
    this.getStock();
   
    
  }

  ngOnChanges(){

    this.getProdutos();
    this.getStock();

    this.listProductoStock = [];
      for(let producto of this.listProductos){
        for(let stock of this.listStock){
          if(producto.idproducto === stock.idproducto){
            const productoStock: ProductoStock = {
              idproducto : producto.idproducto,
              idstock : stock.idstock,
              nompro: producto.nompro,
              precio: producto.precio,
              cantidad: stock.cantidad
            };
            this.listProductoStock.push(productoStock);
          }
        }
      }      

      this.cdr.detectChanges();    
  }


    // METODO GET -----------------------------------------------
   public getProdutos():void{
    this.productoService.getProductos().subscribe({
      next:(Response: Producto[])=>{
        this.listProductos=Response;
        this.processData();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  // METODO GET STOCK ------------------------------------------
  public getStock():void{
    this.stockService.getStock().subscribe({
      next:(Response: Stock[])=>{
        this.listStock=Response;
        this.processData();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  // METODO CARGA TABLA LUEGO DE QUE LOS SUBSCRIBE DE GETPRODUCTO Y GETSTOCK CARGUEN SUS LISTADOS

  private processData(): void {    
    
    if (this.listProductos.length > 0 && this.listStock.length > 0) {
      this.listProductoStock = [];
      for(let producto of this.listProductos){
        for(let stock of this.listStock){
          console.log(stock);
          if(producto.idproducto === stock.idproducto){
            const productoStock: ProductoStock = {
              idproducto : producto.idproducto,
              idstock : stock.idstock,
              nompro: producto.nompro,
              precio: producto.precio,
              cantidad: stock.cantidad
            };
            this.listProductoStock.push(productoStock);
          }
        }
      }
      this.cdr.detectChanges();
    }
  }

  // METODOS PARA SUBIR Y BAJAR CANTIDADES DE CADA PRODUCTO EN CARRITO

  public decreaseQuantity(id: number, nomPro: String) {
    const input = document.getElementById("quantity-"+id) as HTMLInputElement;
    if(input){
      if(parseInt(input.value) > 0) {
      input.value = (parseInt(input.value) - 1).toString();      
      
      //document.getElementById("celda-precio-carrito")!.innerHTML="$"+(transaction.cost*parseInt(input.value)).toString();
      }
    }
  
  }
  
  public increaseQuantity(id: number, nomPro: String) {
    const input = document.getElementById("quantity-"+id) as HTMLInputElement;
    input.value = (parseInt(input.value) + 1).toString();     
   // document.getElementById("celda-precio-carrito")!.innerHTML="$"+(transaction.cost*parseInt(input.value)).toString();
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
        inputASetear.value = "1";
      }

      //this.cdr.detectChanges();

  }

  // METODO PARA CHECKEAR SI CLICKEO EN STOCK O NO

  public checkearStock(id: number){

    const checker = document.getElementById("id-checkbox-stock-"+id) as HTMLInputElement;
    const checkerMostrar = document.getElementById("quantity-checker-"+id) as HTMLInputElement;
    
    if(checker.checked){
      checker.checked = true;
      checkerMostrar.style.display="flex";
    }else{
      checker.checked = false;
      checkerMostrar.style.display="none";
    }
    

  }

  // METODO PARA MOSTRAR U OCULTAR PANEL NUEVO PRODUCTO

  public mostrarPanelNuevoProducto(){

    let mostrarPanel = document.getElementById("nuevo-producto") as HTMLElement;
    let btnAgregarProducto = document.getElementById("boton-agregar-producto") as HTMLElement;

    if(this.comparador===1){
      btnAgregarProducto.style.display = "none";
      mostrarPanel.style.display = "flex";
      this.comparador = 0;
    }     
    
    
  /*  if(window.getComputedStyle(mostrarPanel).display==="flex"){
      mostrarPanel.style.display = "none";
      mostrarPanel.style.backgroundColor = "red"
      console.log("Entro en 1");
    }else{
      mostrarPanel.style.display = "flex";
      mostrarPanel.style.backgroundColor = "red"
      console.log("Entro en 2");
    }
  */
    this.cdr.detectChanges();

  }

  // METODO PARA OCULTAR PANEL NUEVO PRODUCTO

  public ocultarPanelNuevoProducto(){

    let mostrarPanel = document.getElementById("nuevo-producto") as HTMLElement;
    let btnAgregarProducto = document.getElementById("boton-agregar-producto") as HTMLElement;

    mostrarPanel.style.display = "none";

    btnAgregarProducto.style.display = "flex";

    this.comparador = 1;

    this.cdr.detectChanges();
  }


  // METODO NUEVO PRODUCTO

  public agregarProducto(ngProducto: NgForm){

    console.log(ngProducto.value);

    document.getElementById('cerrar-nuevo-producto')?.click();

    
// AGREGAMOS PRODUCTO NUEVO
  this.productoService.addProducto(ngProducto.value).subscribe({
      next:(Response: Producto)=>{
        alert("Se ha agregado "+Response.nompro+" correctamente");

        // CARGAMOS SU STOCK
        let stock: Stock = {} as Stock;
        stock.idstock = Response.idproducto;
        stock.idproducto = Response.idproducto;
        stock.nompro = Response.nompro;
        stock.cantidad = 1;
        
        // LUEGO AGREGAMOS EL PRODUCTO A LA TABLA DE STOCK
        this.stockService.addStock(stock).subscribe({
          next:(Response: Stock)=>{
            alert("Stock de "+Response.nompro+" agregado");
          }
        });


      },
      error:(error: HttpErrorResponse)=>{
        alert("Error "+error.message+" al cargar nuevo producto");
      }
    }) 

    

    ngProducto.reset();

  }

  public onEdit(idProductoStock:number): void{

    let iconEdit = document.getElementById('id-edit-icon-'+idProductoStock) as HTMLElement;

    if(this.banderaEdit===0){

      let parrafo =  document.getElementById('parrafo-nombre-'+idProductoStock) as HTMLElement;
      parrafo.style.display= "none";

      let editable = document.getElementById('input-nombre-'+idProductoStock) as HTMLElement;
      editable.style.display="block";

      this.banderaEdit=1;

    }else{
      //Checkeamos si camió datos primero
      let nomProEditado = document.getElementById('input-nombre-'+idProductoStock) as HTMLInputElement;
     
      for(let productoStock of this.listProductoStock){
        if(idProductoStock==productoStock.idproducto){

          if(nomProEditado.value != productoStock.nompro){
            alert("CAMBIASTE EL NOMBRE! Deseas guardar el cambio?")
          }

        }
      }
       

      let parrafo =  document.getElementById('parrafo-nombre-'+idProductoStock) as HTMLElement;
      parrafo.style.display= "block";

      let editable = document.getElementById('input-nombre-'+idProductoStock) as HTMLElement;
      editable.style.display="none";
       

      this.banderaEdit=0;

    }


  }

  public editOdeleteEnter(idProducto: number, editOdelete: String): void{

    if(editOdelete==="edit"){

      let iconEdit = document.getElementById('id-edit-icon-'+idProducto) as HTMLElement;

      iconEdit.style.color = "green";
      iconEdit.style.cursor = "pointer";

    }else if(editOdelete==="delete"){

      let iconEdit = document.getElementById('id-delete-icon-'+idProducto) as HTMLElement;

      iconEdit.style.color = "red";
      iconEdit.style.cursor = "pointer";

    }


  }

  public editOdeleteLeave(idProducto: number, editOdelete: String): void{

    if(editOdelete==="edit"){

      let iconEdit = document.getElementById('id-edit-icon-'+idProducto) as HTMLElement;

      iconEdit.style.color = "black";
      iconEdit.style.cursor = "none";

    }else if(editOdelete==="delete"){

      let iconEdit = document.getElementById('id-delete-icon-'+idProducto) as HTMLElement;

      iconEdit.style.color = "black";
      iconEdit.style.cursor = "none";

    }

  }

}
