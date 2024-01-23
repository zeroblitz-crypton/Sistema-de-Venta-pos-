import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'my_app_token';
  private apiUrl = 'http://localhost:5000/sis/login'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
   
    
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(
      tap(
        (response) => {
          
          if (response && response.token) {
            const usuarioJson=JSON.stringify(response.usuario)
            localStorage.setItem(this.TOKEN_KEY, usuarioJson);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      )
    );
  }
  logout(): void {
    // Lógica de cierre de sesión
    // ...

    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    // Verifica la presencia del token en el almacenamiento local
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}