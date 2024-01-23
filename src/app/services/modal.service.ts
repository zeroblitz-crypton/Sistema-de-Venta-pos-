import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioModalComponent } from '../modals/usuario-modal/usuario-modal.component';
import { ProductoModalComponent } from '../modals/producto-modal/producto-modal.component';
import { ClientesModalComponent } from '../modals/clientes-modal/clientes-modal.component';
import { PermisosComponent } from '../modals/permisos/permisos.component';
import { FindClienteModalComponent } from '../modals/find-cliente-modal/find-cliente-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public usuarioModal: MatDialogRef<UsuarioModalComponent> | null=null;
  public productoModal: MatDialogRef<ProductoModalComponent> | null=null;
  public clienteModal: MatDialogRef<ClientesModalComponent> | null=null;
  public permisoModal: MatDialogRef<PermisosComponent> | null=null;
  public findClienteModal: MatDialogRef<FindClienteModalComponent> | null=null;

 
  constructor(private dialog: MatDialog) {}

  openModalFindCliente(): void {
    this.findClienteModal = this.dialog.open(FindClienteModalComponent, {
      width: '65%', // Agrega comillas al valor del ancho
      
    });
  }

  closeModalFindCliente(client):void{
    if(this.findClienteModal){
      this.findClienteModal.close(client);
    }
  }

  openModalUsuario(usuario?:any): void {
    this.usuarioModal = this.dialog.open(UsuarioModalComponent,{
      data:usuario
    });
  }

  closeModalUsuario():void{
    if(this.usuarioModal){
      this.usuarioModal.close();
    }
  }

  openModalProducto(producto:any): void {
    this.productoModal = this.dialog.open(ProductoModalComponent,{
      data:producto
    });
  }
  closeModalProducto():void{
    if(this.productoModal){
      this.productoModal.close();
    }
  }

  openModalCliente(clienteData?: any): void {
   
    this.clienteModal = this.dialog.open(ClientesModalComponent, {
      data: clienteData
    });
   
    
  }
  closeModalCliente():void{
    if(this.clienteModal){
      this.clienteModal.close("se cerro clientes");
    }
    
  }

  openModalPermiso(id?: any): void {
   
    this.permisoModal = this.dialog.open(PermisosComponent, {
      data: id
    });
   
    
  }
  closeModalPermiso():void{
    if(this.permisoModal){
      this.permisoModal.close("se cerro permisos");
    }
    
  }
}
