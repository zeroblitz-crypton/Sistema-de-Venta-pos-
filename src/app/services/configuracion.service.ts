import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:5000/sis/configuracion'; // Ajusta la URL según la ubicación de tu servidor Flask

  constructor(private http: HttpClient) {}

  obtenerConfiguracion(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  actualizarConfiguracion(nuevaConfiguracion: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, nuevaConfiguracion);
  }
  
}
