import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private actualizarStock = new Subject<any>();
  public onVentaRealizada = this.actualizarStock.asObservable();

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStock():Observable<Stock[]>{

    return this.http.get<Stock[]>(`${this.apiServerUrl}/stock/lista`);

  }

  public updateStock(stock: Stock):Observable<Stock>{

    return this.http.put<Stock>(`${this.apiServerUrl}/stock/update`, stock);

  }


}
