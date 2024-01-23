import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:5000/sis/productos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerProducto(codProducto: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${codProducto}`);
  }

  agregarProducto(nuevoProducto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nuevoProducto);
  }

  actualizarProducto(codProducto: number, productoActualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${codProducto}`, productoActualizado);
  }

  eliminarProducto(codProducto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${codProducto}`);
  }
}
