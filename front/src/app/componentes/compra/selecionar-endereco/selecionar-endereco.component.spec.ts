import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarEnderecoComponent } from './selecionar-endereco.component';

describe('SelecionarEnderecoComponent', () => {
  let component: SelecionarEnderecoComponent;
  let fixture: ComponentFixture<SelecionarEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
