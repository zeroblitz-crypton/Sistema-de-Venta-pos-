import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private apiUrl = 'http://localhost:5000/sis/registros';  
  constructor(private http: HttpClient) {}

  obtenerRegistros(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

}
