import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ProductosComponent } from '../productos/productos.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { VentaComponent } from '../venta/venta.component';
import { VentasComponent } from '../ventas/ventas.component';
import { PdfDetalleVentaComponent } from '../../components/pdf-detalle-venta/pdf-detalle-venta.component';
import { DashboardInicioComponent } from '../dashboard-inicio/dashboard-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboardInicio', component: DashboardInicioComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboardInicio', pathMatch: 'full' }, // Redirige al componente por defecto
      
      { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
      { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
      { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
      { path: 'venta', component: VentaComponent, canActivate: [AuthGuard] },
      { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
      { path: 'ventaspdf/:id', component: PdfDetalleVentaComponent, canActivate: [AuthGuard] },
      // Otras rutas secundarias si las tienes
    ],
  },
];


  
@NgModule({
  declarations: [DashboardComponent,
    
    
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
