import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoNaoLogadoComponent } from './cabecalho-nao-logado.component';

describe('CabecalhoNaoLogadoComponent', () => {
  let component: CabecalhoNaoLogadoComponent;
  let fixture: ComponentFixture<CabecalhoNaoLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoNaoLogadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoNaoLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
