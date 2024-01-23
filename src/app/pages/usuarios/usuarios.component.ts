import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UsuarioService } from '../../services/usuario.service';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarios:any
  auxUsuario:any
  searchUsuario=''
  constructor(
    private modalService: ModalService,
    private usuarioService: UsuarioService
    ) {
  
  }
  ngOnInit(){
    this.listarUsuarios()
  }

  listarUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe(data=>{
      this.usuarios=data    
      this.auxUsuario=data
    })
  }
  openModal(usuario?:any): void {
    var modalAbierto = this.modalService.openModalUsuario(usuario);
    this.modalService.usuarioModal?.afterClosed().subscribe(data=>{
      this.listarUsuarios()
      
    })
  }
  eliminarUsuario(idUsuario:any){
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
        this.usuarioService.eliminarUsuario(idUsuario).subscribe(data=>{
          this.listarUsuarios()
          
        })
      }
    });
   
  }
  openModalPermiso(id:any){
    this.modalService.openModalPermiso(id);
    this.modalService.permisoModal?.afterClosed().subscribe(data=>{
      this.listarUsuarios()
     
    })
  }
  searchUsuarios(){
    this.usuarios = this.auxUsuario.filter((us:any)=> 
    us.nombre.toLowerCase().includes(this.searchUsuario.toLowerCase()) || 
    us.usuario.toLowerCase().includes(this.searchUsuario.toLowerCase()) ||
    us.correo.toLowerCase().includes(this.searchUsuario.toLowerCase())
    ) 
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
