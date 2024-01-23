import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';
import { FormGroup } from '@angular/forms';
import { PermisosService } from '../../services/permisos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent {
  permisos: any;
    detallePermisos: any;
    permisosPorUsuario:any
    permisosSeleccionados: any[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private modalService: ModalService,
        private permisoService: PermisosService
    ) { }

    ngOnInit() {
        this.listarPermisos();
    }

    listarPermisos() {
      this.permisoService.obtenerPermisos().subscribe(data => {
          this.permisos = data;
      });
  
      this.permisoService.obtenerDetallePermiso(this.data).subscribe(data => {
          this.detallePermisos = data;
          this.permisosPorUsuario=data;
          this.permisosSeleccionados = this.detallePermisos.map((detalle: any) => detalle.id_permiso);          
      });
    }

    hasPermission(permisoId: number): boolean {
        return this.permisosSeleccionados.includes(permisoId);
    }

    togglePermission(permisoId: number): void {
        const index = this.permisosSeleccionados.indexOf(permisoId);
        if (index === -1) {
            this.permisosSeleccionados.push(permisoId);
        } else {
            this.permisosSeleccionados.splice(index, 1);
        }

        
    }

    guardarPermisos() {
        // Lógica para guardar los permisos en el servidor
        const nuevoDetallePerm = this.permisosSeleccionados.map((per: any) => ({
          id_permiso: per,
          id_usuario: this.data
        }));
        if(this.permisosPorUsuario.length>0){
          this.permisoService.actualizarDetallesPermisos(nuevoDetallePerm,this.data).subscribe(data=>{

          })
        }
        else{
          this.permisoService.guardarDetallesPermisos(nuevoDetallePerm).subscribe(data=>{
            
          })
        }
        this.mensaje("Todo bien !! ","Guardado Correctamente")
        this.closeModal();
    }

    closeModal() {
        this.modalService.closeModalPermiso();
    }
    mensaje(titulo:any,mensaje:any){
      Swal.fire(titulo,mensaje, 'success');
    }
}
