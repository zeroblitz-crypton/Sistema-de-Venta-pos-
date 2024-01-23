import { Component } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-dashboard-inicio',
  templateUrl: './dashboard-inicio.component.html',
  styleUrl: './dashboard-inicio.component.scss'
})
export class DashboardInicioComponent {
  
  registros:any=[]
  constructor(
    private registroService:RegistrosService
  ){}

  ngOnInit(){
    this.obtenerRegistros()
  }
  obtenerRegistros(){
    this.registroService.obtenerRegistros().subscribe(data=>{
      this.registros=data
      
      
    })
  }
}
