import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregarFotosComponent } from './carregar-fotos.component';

describe('CarregarFotosComponent', () => {
  let component: CarregarFotosComponent;
  let fixture: ComponentFixture<CarregarFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregarFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarregarFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
