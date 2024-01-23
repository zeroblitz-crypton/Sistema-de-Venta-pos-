import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgModule } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { VentasService } from '../../services/ventas.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {
  private readonly TOKEN_KEY = 'my_app_token';

  productos:any;
  auxProductos:any;
  clientes:any
  auxClientes:any;
  searchProd: string = '';
  searchClient:string='';
  listaVenta:any=[]

  nombreCliente:any=""
  telefonoCliente:any=""
  direccionCliente:any=""
  idCliente:any=""

  usuario:any
  constructor(
    private productoService:ProductoService,
    private ventaService:VentasService,
    private modalService:ModalService,
    private router:Router
  ){

  }

  ngOnInit(){
    this.listarProductos()
    this.idCliente=1
    this.nombreCliente="Publico en General"
    this.telefonoCliente="999999999"
    this.direccionCliente="S/D"
    this.usuario=JSON.parse(localStorage.getItem(this.TOKEN_KEY))
    
  }

  listarProductos(){
    this.productoService.obtenerProductos().subscribe(data=>{
      this.productos=data
      this.auxProductos=data
      
    })
  }

    openModalCliente(){
      this.modalService.openModalFindCliente()
      this.modalService.findClienteModal?.afterClosed().subscribe(data=>{
     
        this.nombreCliente=data.nombre
        this.telefonoCliente=data.telefono
        this.direccionCliente=data.direccion
        this.idCliente=data.idcliente
      })
    }
  
  
    searchProducto(){
      this.productos = this.auxProductos.filter((prod:any)=> 
      prod.descripcion.toLowerCase().includes(this.searchProd.toLowerCase()) || 
      prod.codigo.toLowerCase().includes(this.searchProd.toLowerCase()) ||
      prod.precio.toLowerCase().includes(this.searchProd.toLowerCase())
      ) 
    }

    agregarListaVenta(prod) {
      const productoExistente = this.listaVenta.find(item => item.codproducto === prod.codproducto);
    
      if (productoExistente) {
        // Si el producto ya existe en la lista, aumenta la cantidad
        productoExistente.existencia++;
    
        // Reducir la existencia del producto en la lista principal si aún hay existencia
        if (prod.existencia > 0) {
          prod.existencia--;
        }
      } else {
        // Si el producto no existe, agrégalo a listaVenta solo si hay existencia
        if (prod.existencia > 0) {
          this.listaVenta.push({
            codigo:prod.codigo,
            codproducto: prod.codproducto,
            descripcion: prod.descripcion,
            estado:prod.existencia,
            existencia: 1,
            precio: prod.precio,
            usuario_id:prod.usuario_id
          });
    
          // Reducir la existencia del producto en la lista principal
          prod.existencia--;
        }
      }
      this.precioTotal()
     
    }
    quitarListaVenta(prod) {
      const productoExistente = this.listaVenta.find(item => item.codproducto === prod.codproducto);
  
      if (productoExistente) {
        // Si el producto existe en la lista, disminuir la cantidad
        productoExistente.existencia--;
  
        // Si la cantidad llega a 0, quitar el producto de listaVenta
        if (productoExistente.existencia === 0) {
          const index = this.listaVenta.indexOf(productoExistente);
          this.listaVenta.splice(index, 1);
        }
  
        // Aumentar la existencia del producto en la lista principal
        const productoFind = this.productos.find(item => item.codproducto === prod.codproducto)
        productoFind.existencia++;
      }
      this.precioTotal()

    }

    precioTotal(){
      var precioTotal = 0;

      this.listaVenta.forEach(e => {
        precioTotal += e.precio * e.existencia;
      });
    
      return precioTotal
      
    }

    cancelarListaVenta(){
      this.listarProductos()
      this.listaVenta=[]
    }

    guardarVenta(){
      if(this.listaVenta.length>0 && this.idCliente!=''){

        const detalles_venta:any=[]
        this.listaVenta.forEach(e => {
          detalles_venta.push({
            id_producto:e.codproducto,
            cantidad:e.existencia,
            precio:e.precio
          })
        });
  
        const jsonVenta={
          id_cliente:this.idCliente,
          total:this.precioTotal(),
          id_usuario:this.usuario.idusuario,
          detalles_venta
        }
        if (this.idCliente!='') {
          this.ventaService.crearVenta(jsonVenta).subscribe(data=>{
           
            this.listarProductos()
            this.listaVenta=[]
            this.idCliente=1
            this.nombreCliente="Publico en General"
            this.telefonoCliente="999999999"
            this.direccionCliente="S/D"
            this.mensaje("Genial!!",data)
          })
        }
        
      }
      else{
        Swal.fire("Ups !","Parece que no seleccionaste un cliente", 'warning');
      }
      

    }       
    
    mensaje(titulo:any,mensaje:any){
      Swal.fire(titulo,mensaje, 'success');
    }
    
}
