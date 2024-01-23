import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private apiUrl = 'http://localhost:5000/sis/permisos'; // Reemplaza con la URL de tu API
  private apiUrlDetalle = 'http://localhost:5000/sis/detalle_permisos'; // Reemplaza con la URL de tu API
  
  constructor(private http: HttpClient) {}

  obtenerPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerDetallesPermisos(): Observable<any> {
    return this.http.get(`${this.apiUrlDetalle}`);
  }

  obtenerDetallePermiso(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlDetalle}/${id}`);
  }

  guardarDetallesPermisos(nuevosDetalles: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrlDetalle}`, nuevosDetalles);
  }

  actualizarDetallesPermisos(detallesActualizados: any[],id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlDetalle}/${id}`, detallesActualizados);
  }

  eliminarDetallePermiso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlDetalle}/${id}`);
  }


}
