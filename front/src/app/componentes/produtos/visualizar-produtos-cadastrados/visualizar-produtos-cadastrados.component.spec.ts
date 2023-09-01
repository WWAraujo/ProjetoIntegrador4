import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProdutosCadastradosComponent } from './visualizar-produtos-cadastrados.component';

describe('VisualizarProdutosCadastradosComponent', () => {
  let component: VisualizarProdutosCadastradosComponent;
  let fixture: ComponentFixture<VisualizarProdutosCadastradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProdutosCadastradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProdutosCadastradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
