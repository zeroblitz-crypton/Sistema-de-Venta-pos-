import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrl: './usuario-modal.component.scss'
})
export class UsuarioModalComponent {
  usuarioForm: FormGroup;
  isEdit=false;
  idUsuario="";
  estadoUsuario="";

  constructor(
    private fb: FormBuilder,
    private modalService:ModalService,
    private usuarioService:UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }
  ngOnInit(){
    if(this.data){
      this.idUsuario=this.data.idusuario
      this.estadoUsuario=this.data.estado
      this.usuarioForm.patchValue(this.data)
      this.usuarioForm.get('clave').setValue(null)
      this.isEdit=true
    }
  }
  closeModal():void{
    this.modalService.closeModalUsuario();
  }
  guardar(): void {
    if (this.usuarioForm.valid) {
      // Aquí puedes manejar la lógica para enviar el formulario
      if(this.isEdit){
        const nuevoUsuario = {
          ...this.usuarioForm.value,
          idusuario: this.idUsuario,
          estado: this.estadoUsuario
        };
        this.usuarioService.actualizarUsuario(nuevoUsuario.idusuario,nuevoUsuario).subscribe(data=>{
          this.closeModal()
        })
      }
      else{
        const nuevoUsuario = {
          ...this.usuarioForm.value,          
          estado: 1
        };
        this.usuarioService.agregarUsuario(nuevoUsuario).subscribe(data=>{
          this.closeModal()
        })
      }
    } else {
    }
    this.mensaje("Guardado!!","Guardado Correctamente")

  }

 
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
  
}
