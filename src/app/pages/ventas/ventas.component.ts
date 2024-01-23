import { Component } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  ventas:any
  auxventas:any
  searchVenta=""
  constructor(
    private ventaService:VentasService
  ){

  }

  ngOnInit(){
    this.listarVentas()
  }
  listarVentas(){
    this.ventaService.obtenerDetalleVentas().subscribe(data=>{
      this.ventas=data
      this.auxventas=data
  
      
      
    })
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  searchVentas(){
    this.ventas = this.auxventas.filter((us:any)=> 
    us.cliente_nombre.toLowerCase().includes(this.searchVenta.toLowerCase()) || 
    us.total.toLowerCase().includes(this.searchVenta.toLowerCase())
    ) 
  }
}
