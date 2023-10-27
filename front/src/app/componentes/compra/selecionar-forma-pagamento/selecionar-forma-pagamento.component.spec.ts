import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarFormaPagamentoComponent } from './selecionar-forma-pagamento.component';

describe('SelecionarFormaPagamentoComponent', () => {
  let component: SelecionarFormaPagamentoComponent;
  let fixture: ComponentFixture<SelecionarFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarFormaPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
