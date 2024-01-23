import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VentaComponent } from './pages/venta/venta.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModalComponent } from './modals/usuario-modal/usuario-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoModalComponent } from './modals/producto-modal/producto-modal.component';
import { ClientesModalComponent } from './modals/clientes-modal/clientes-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { PermisosComponent } from './modals/permisos/permisos.component';
import { FormsModule } from '@angular/forms';
import { FindClienteModalComponent } from './modals/find-cliente-modal/find-cliente-modal.component';
import { PdfDetalleVentaComponent } from './components/pdf-detalle-venta/pdf-detalle-venta.component';
import { LoginModule } from './pages/login/login.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    VentasComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    UsuarioModalComponent,
    ProductoModalComponent,
    ClientesModalComponent,
    PermisosComponent,
    FindClienteModalComponent,
    PdfDetalleVentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
