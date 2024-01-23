import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ProductoService } from '../../services/producto.service';
import { NgModule } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productos:any
  auxProductos:any
  searchProd: string = '';
  constructor(
    private modalservice:ModalService,
    private productoService:ProductoService
    ){}

  ngOnInit(){
    this.listarProductos()
  }

  listarProductos(){
    this.productoService.obtenerProductos().subscribe(data=>{
      this.productos=data
      this.auxProductos=data
      
    })
  }

  openModalProducto(producto:any){
    this.modalservice.openModalProducto(producto)
    this.modalservice.productoModal?.afterClosed().subscribe(data=>{
      this.listarProductos()
    })
  }

  eliminarProducto(id:any){

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
        this.productoService.eliminarProducto(id).subscribe(data=>{
          this.listarProductos()
          this.mensaje("Bien!!","Eliminado correctamente")
        })
      }
    });
    
  }

  searchProductos(){
    this.productos = this.auxProductos.filter((prod:any)=> 
    prod.descripcion.toLowerCase().includes(this.searchProd.toLowerCase()) || 
    prod.codigo.toLowerCase().includes(this.searchProd.toLowerCase()) ||
    prod.precio.toLowerCase().includes(this.searchProd.toLowerCase())
    ) 
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }

} 
