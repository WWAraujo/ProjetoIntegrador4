import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoCompraComponent } from './confirmacao-compra.component';

describe('ConfirmacaoCompraComponent', () => {
  let component: ConfirmacaoCompraComponent;
  let fixture: ComponentFixture<ConfirmacaoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
