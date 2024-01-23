import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { VentasService } from '../../services/ventas.service';
import { UsuarioService } from '../../services/usuario.service';
import { ConfiguracionService } from '../../services/configuracion.service';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-detalle-venta',
  templateUrl: './pdf-detalle-venta.component.html',
  styleUrl: './pdf-detalle-venta.component.scss'
})
export class PdfDetalleVentaComponent {
  id:any
 
  venta:any
  configuracion:any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ventaService:VentasService,
    private configuracioService: ConfiguracionService
  ){}

  ngOnInit(){
    
    this.route.paramMap.subscribe((params) => {     
      this.id = +params.get('id');
    });

    this.ventaService.obtenerVentaPorId(this.id).subscribe(data=>{
      this.venta=data.venta
      
      
    })

    this.configuracioService.obtenerConfiguracion().subscribe(data=>{
      this.configuracion=data
      
      
    })

    this.crearPdf()
    
  }
  formatDate(dateString: any): any {
    return new Date(dateString).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
 crearPdf() {
  this.ventaService.obtenerVentaPorId(this.id).subscribe(data => {
    this.venta = data.venta;

    if (this.venta) {
      const pdfDefinition: any = {
        content: [
          {
            text: 'Detalle de Venta',
            style: 'header',
            alignment: 'center',
            margin: [10, 10, 10, 10], // Separación después del título principal
          },
          {
            text: 'Información del Cliente:',
            style: 'subheader',
            margin: [0, 10, 0, 5],
          },
          {
            columns: [
              {
                text: 'Nombre:',
                width: 'auto',
                bold: true,
                margin: [5, 0, 0, 5],
              },
              {
                text: this.venta.cliente.nombre,
                width: 'auto',
                margin: [5, 0, 0, 5],
              },
            ],
            margin: [0, 5], // Separación después de cada línea de información del cliente
          },
          {
            columns: [
              {
                text: 'Telefono:  ',
                width: 'auto',
                bold: true,
                margin: [5, 0, 0, 5],
              },
              {
                text: this.venta.cliente.telefono,
                width: 'auto',
                margin: [5, 0, 0, 5],
              },
            ],
            
          },
          {
            columns: [
              {
                text: 'Direccion:   ',
                width: 'auto',
                bold: true,
                margin: [5, 0, 0, 5],
              },
              {
                text: this.venta.cliente.direccion,
                width: 'auto',
                margin: [5, 0, 0, 5],
              },
            ],
            margin: [0, 10], // Separación adicional después de la dirección
          },
          {
            text: 'Fecha de Venta:',
            style: 'subheader',
            margin: [0, 10, 0, 5],
          },
          {
            text: this.formatDate(new Date(this.venta.fecha)), 
            margin: [0, 5], // Separación después de la fecha
          },
          {
            text: 'Productos Comprados:',
            style: 'subheader',
            margin: [0, 10, 0, 5],
          },
          {
            table: {
              widths: ['*', 'auto', 'auto', 'auto'],
              headerRows: 1,
              body: [
                ['Producto', 'Cantidad', 'Precio', 'Subtotal'],
                ...this.venta.productos.map((producto: any) => [
                  producto.descripcion,
                  producto.cantidad,
                  `S/. ${producto.precio}`,
                  `S/. ${producto.cantidad * producto.precio}`,
                ]),
              ],
            },
            margin: [0, 10], // Separación antes y después de la tabla
          },
          {
            text: `Total: S/. ${this.venta.total}`,
            margin: [0, 10, 0, 5],
            bold: true,
          },
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            color: 'white',  // Color del texto blanco
            background: 'black',  // Fondo negro
            margin: [0, 0, 0, 10], // Ajuste del margen para el título
          },
          subheader: {
            fontSize: 18,
            bold: true,
            margin: [0, 5],
          },
        },
        
      };
      


      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
      this.router.navigate(['/ventas']);
    } else {
      console.error('Error: No se ha cargado la información de la venta.');
    }
  });
}


}
