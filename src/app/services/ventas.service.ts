import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public guardarVenta(venta: Venta):Observable<Venta>{
    return this.httpClient.post<Venta>(`${this.apiServerUrl}/venta/add`, venta);
  }

}
