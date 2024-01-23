import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrl: './producto-modal.component.scss'
})
export class ProductoModalComponent {
  private readonly TOKEN_KEY = 'my_app_token';
  usuario:any
  productoForm: FormGroup;
  isEdit=false
  dataAdicional={
    estado:'',
    codproducto:'',
    usuario_id:''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private modalService:ModalService,
    private productoService:ProductoService
    
    ) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencia: ['', Validators.required],
    });
  }
  ngOnInit(){
    this.usuario=JSON.parse(localStorage.getItem(this.TOKEN_KEY))
    
    
    if(this.data){
     
      this.dataAdicional.codproducto=this.data.codproducto
      this.dataAdicional.estado=this.data.estado
      this.dataAdicional.usuario_id=this.usuario.idusuario
      this.isEdit=true
      this.productoForm.patchValue(this.data)
    }
  }
  closeModal():void{
    this.modalService.closeModalProducto();
  }
  guardar(): void {
    if (this.productoForm.valid) {
   
      if(this.isEdit){
        const nuevoProducto = {
          ...this.productoForm.value,
         codproducto:this.dataAdicional.codproducto,
         estado:this.dataAdicional.estado,
         usuario_id:this.usuario.idusuario
        };
        this.productoService.actualizarProducto(nuevoProducto.codproducto,nuevoProducto).subscribe(data=>{
          this.closeModal()

        })
       
      }
      else{
        const nuevoProducto = {
          ...this.productoForm.value,
         estado:1,
         usuario_id:this.usuario.idusuario
        };
        this.productoService.agregarProducto(nuevoProducto).subscribe(data=>{
          this.closeModal()
        })
      }
      this.mensaje("Genial!!","Se guardo correctamente")
    } else {
    }
  }
  

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
