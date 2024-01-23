import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost:5000/sis/ventas';  
  constructor(private http: HttpClient) {}

  obtenerVentaPorId(idVenta: number): Observable<any> {
    const url = `${this.apiUrl}/${idVenta}`;
    return this.http.get<any>(url);
  }

  obtenerDetalleVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearVenta(ventaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, ventaData);
  }
}
