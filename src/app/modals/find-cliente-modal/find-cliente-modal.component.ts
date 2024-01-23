import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NgModule } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-find-cliente-modal',
  templateUrl: './find-cliente-modal.component.html',
  styleUrl: './find-cliente-modal.component.scss'
})
export class FindClienteModalComponent {
  clientes:any
  auxClientes:any
  searchCliente:any=''
  constructor(
    private modalService:ModalService,
    private clienteService:ClienteService
  ){

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
  searchClientes(){
    this.clientes = this.auxClientes.filter((client:any)=> 
    client.nombre.toLowerCase().includes(this.searchCliente.toLowerCase()) || 
    client.telefono.toLowerCase().includes(this.searchCliente.toLowerCase()) ||
    client.direccion.toLowerCase().includes(this.searchCliente.toLowerCase())
    ) 
  }
  seleccionarCliente(cliente:any){
  
    this.modalService.closeModalFindCliente(cliente)
  }

  closeModal(){
    this.modalService.closeModalFindCliente(null)
  }
}
