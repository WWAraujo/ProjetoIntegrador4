import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcluirPensamnetoComponent } from './excluir-pensamneto.component';

describe('ExcluirPensamnetoComponent', () => {
  let component: ExcluirPensamnetoComponent;
  let fixture: ComponentFixture<ExcluirPensamnetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirPensamnetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirPensamnetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
