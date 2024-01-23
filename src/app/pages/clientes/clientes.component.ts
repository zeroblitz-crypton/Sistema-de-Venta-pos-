import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ClienteService } from '../../services/cliente.service';
import { NgModule } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  clientes:any
  auxClientes:any
  searchCliente:any=''
  constructor(private modalService: ModalService,
              private clienteService:ClienteService
              ) {
  
  }
  ngOnInit(){
    this.listarClientes()
  }

  listarClientes(){
    this.clienteService.obtenerClientes().subscribe(data=>{
      this.clientes=data
      this.auxClientes=data      
    })
  }

  eliminarCliente(idcliente:any){
    

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(idcliente).subscribe(data=>{
          this.listarClientes()
          this.mensaje("Bien!!","Se elimino correctamente")
        })
      }
    });
  }

  openModal(cliente: any): void {
    if (cliente) {    
  
      var openModal=this.modalService.openModalCliente(cliente);
      this.modalService.clienteModal?.afterClosed().subscribe(data=>{
        this.listarClientes()
      })
    }
    else{
      var openModal=this.modalService.openModalCliente();
      this.modalService.clienteModal?.afterClosed().subscribe(data=>{
        this.listarClientes()
      })
    }
  }


  searchClientes(){
    this.clientes = this.auxClientes.filter((client:any)=> 
    client.nombre.toLowerCase().includes(this.searchCliente.toLowerCase()) || 
    client.telefono.toLowerCase().includes(this.searchCliente.toLowerCase()) ||
    client.direccion.toLowerCase().includes(this.searchCliente.toLowerCase())
    ) 
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
