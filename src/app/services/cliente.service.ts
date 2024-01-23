import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5000/sis/clientes'; // Reemplaza con la URL de tu servidor Flask



  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerClientePorId(clienteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clienteId}`);
  }

  crearCliente(clienteData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, clienteData);
  }

  actualizarCliente(clienteId: number, clienteData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${clienteId}`, clienteData);
  }

  eliminarCliente(clienteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${clienteId}`);
  }
}
