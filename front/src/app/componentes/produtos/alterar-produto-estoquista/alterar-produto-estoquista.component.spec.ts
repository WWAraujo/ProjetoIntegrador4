/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlterarProdutoEstoquistaComponent } from './alterar-produto-estoquista.component';

describe('AlterarProdutoEstoquistaComponent', () => {
  let component: AlterarProdutoEstoquistaComponent;
  let fixture: ComponentFixture<AlterarProdutoEstoquistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarProdutoEstoquistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarProdutoEstoquistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
