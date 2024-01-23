import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { RegistrosService } from '../../services/registros.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PermisosService } from '../../services/permisos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  registros:any
  usuario:any
  id:any
  rutasMostrar:any
  rutasUsuario:any=[]
  private readonly TOKEN_KEY = 'my_app_token';

  constructor(
    private registroService:RegistrosService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService:UsuarioService,
    private permisosService:PermisosService
  ){}
  title = 'SisVentaAngular';
  rutas=[
    {icon:'now-ui-icons design_app',
     link:'/dashboardInicio',
     name:'Dashboard',
     id:7
    },
    {icon:'now-ui-icons shopping_cart-simple',
     link:'/venta',
     name:'NUEVA VENTA',
     id:6
    },
    {icon:'now-ui-icons education_paper',
     link:'/ventas',
     name:'VENTAS',
     id:5
    },
    {icon:'now-ui-icons shopping_box',
     link:'/productos',
     name:'PRODUCTOS',
     id:4
    },
    {icon:'now-ui-icons users_circle-08',
     link:'/clientes',
     name:'CLIENTES',
     id:3
    },
    {icon:'now-ui-icons users_single-02',
     link:'/usuarios',
     name:'USUARIOS',
     id:2
    },
    {icon:'now-ui-icons ui-1_settings-gear-63',
     link:'/configuracion',
     name:'CONFIGURACION',
     id:1
    },
  ]

  ngOnInit() {
    this.obtenerRegistros();
    this.usuario = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    this.router.navigate(['/dashboardInicio']);
  
    this.permisosService.obtenerDetallePermiso(this.usuario.idusuario).subscribe(data => {
    this.rutasUsuario = data;
    const rutaPermisos=this.rutasUsuario.map(usuarioRuta=> usuarioRuta.id_permiso)     
    this.rutasMostrar=this.rutas.filter(ruta=>rutaPermisos.includes(ruta.id))
    });
  }

  obtenerRegistros(){
    this.registroService.obtenerRegistros().subscribe(data=>{
      this.registros=data
    })
  }
  obtenerUsuario(){
    this.usuarioService.obtenerUsuario(this.id).subscribe(data=>{
      
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
