import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5000/sis/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idUsuario}`);
  }

  agregarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nuevoUsuario);
  }

  actualizarUsuario(idUsuario: number, usuarioActualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idUsuario}`, usuarioActualizado);
  }

  eliminarUsuario(idUsuario: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idUsuario}`);
  }

  

}
