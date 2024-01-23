import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
  configuracionForm: FormGroup;
  configuracion:any;
  idConfiguracion:any;
  id:any
  constructor(
    private fb: FormBuilder,
    private configuracionService:ConfiguracionService,
    private route: ActivatedRoute,
  ){
    this.configuracionForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.obtenerConfiguracion()
    this.route.paramMap.subscribe((params) => {           
      this.id = +params.get('id');
    });
  }
  obtenerConfiguracion(){
    this.configuracion=this.configuracionService.obtenerConfiguracion().subscribe(data=>{
      this.configuracion=data      
      this.configuracionForm.patchValue(data)
          
    })
  }

  guardarConfiguracion(){
    this.configuracionService.actualizarConfiguracion(this.configuracionForm.value).subscribe(data=>{
      this.obtenerConfiguracion();
      this.mensaje("Bien!!","Se guardo el cambio")
    })
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
