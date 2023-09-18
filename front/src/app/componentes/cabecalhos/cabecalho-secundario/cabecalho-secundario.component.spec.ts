import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoSecundarioComponent } from './cabecalho-secundario.component';

describe('CabecalhoSecundarioComponent', () => {
  let component: CabecalhoSecundarioComponent;
  let fixture: ComponentFixture<CabecalhoSecundarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoSecundarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoSecundarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
