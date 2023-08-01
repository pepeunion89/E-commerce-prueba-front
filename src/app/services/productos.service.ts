import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //private apiServerUrl='https://portfoliobackend-jxmj.onrender.com'
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProductos():Observable<Producto[]>{

    return this.http.get<Producto[]>(`${this.apiServerUrl}/producto/lista`);

  }

  public editProducto(producto: Producto):Observable<Producto>{

    return this.http.put<Producto>(`${this.apiServerUrl}/producto/update`, producto);

  }

  public addProducto(producto: Producto):Observable<Producto>{
    
    return this.http.post<Producto>(`${this.apiServerUrl}/producto/add`, producto);

  }

  public deleteProducto(idProducto: number):Observable<number>{

    return this.http.delete<number>(`${this.apiServerUrl}/producto/delete/${idProducto}`);

  }

}
