import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDetalleVentaComponent } from './pdf-detalle-venta.component';

describe('PdfDetalleVentaComponent', () => {
  let component: PdfDetalleVentaComponent;
  let fixture: ComponentFixture<PdfDetalleVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfDetalleVentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfDetalleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
