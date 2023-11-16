import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprasClienteComponent } from './listar-compras-cliente.component';

describe('ListarComprasClienteComponent', () => {
  let component: ListarComprasClienteComponent;
  let fixture: ComponentFixture<ListarComprasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComprasClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarComprasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
