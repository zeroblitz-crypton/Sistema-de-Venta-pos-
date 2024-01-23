import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ClienteService } from '../../services/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrl: './clientes-modal.component.scss'
})
export class ClientesModalComponent {
  private readonly TOKEN_KEY = 'my_app_token';
  usuario:any
  isEdit=false
  idCliente=""
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  clienteForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private modalService: ModalService,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<ClientesModalComponent>,
    private router:Router
              ) {
                this.clienteForm = this.fb.group({
                  nombre: ['', Validators.required],
                  telefono: ['', Validators.required],
                  direccion: ['', Validators.required],
                });
   }

   ngOnInit(): void {
    if (this.data) {
      this.clienteForm.patchValue(this.data);
      this.isEdit=true  
      this.idCliente=this.data.idcliente                       
    }   
    this.usuario=JSON.parse(localStorage.getItem(this.TOKEN_KEY))
    
  }



  closeModal(){
    
    this.modalService.closeModalCliente();
    
  }

  guardarCliente(): void {
    if (this.clienteForm.valid) {
      const nuevoCliente = {
        ...this.clienteForm.value,
        usuario_id: this.usuario.idusuario,
        estado: 1
      };

      if(this.isEdit){
        
        const nuevoCliente = {
          ...this.clienteForm.value,
          usuario_id: this.usuario.idusuario,
          estado: 1,
          idcliente:this.idCliente
        };
      
        
        this.clienteService.actualizarCliente(nuevoCliente.idcliente,nuevoCliente).subscribe(data => {
          this.closeModal();
        });
      }else{
        this.clienteService.crearCliente(nuevoCliente).subscribe(data => {
          this.closeModal();
        });
      }
      this.mensaje("Genial!!","Se guardo correctamente")
    }
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }

}
