import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  private readonly TOKEN_KEY = 'my_app_token';

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    ) {
      this.loginForm = this.fb.group({
        usuario: ['', Validators.required],
        clave: ['', Validators.required],
        
      });
    }
    ngOnInit(){
      const usuario=JSON.parse(localStorage.getItem(this.TOKEN_KEY))
      
      if(usuario){
        this.router.navigate(['/dashboard']);
      }
    }
  login(): void {
    const data={
      usuario:this.loginForm.value.usuario,
      clave:this.loginForm.value.clave
    }
    this.authService.login(data).subscribe(data=>{
      
      this.router.navigate(['/dashboard']);
      console.log(data);
       
    },
    (error)=>{
      if (error.status===401){
        this.mensaje("Algo anda mal ","Credenciales Incorrectas")
        
      }else{

        this.mensaje("Algo anda mal ","Error en la solicitud")
      }
    }
    
    );
    // Redirige al dashboard después de iniciar sesión
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'warning');
  }
}
