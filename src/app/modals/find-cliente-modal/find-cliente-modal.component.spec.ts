import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindClienteModalComponent } from './find-cliente-modal.component';

describe('FindClienteModalComponent', () => {
  let component: FindClienteModalComponent;
  let fixture: ComponentFixture<FindClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindClienteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
