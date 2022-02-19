import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaStockFormComponent } from './transferencia-stock-form.component';

describe('TransferenciaStockFormComponent', () => {
  let component: TransferenciaStockFormComponent;
  let fixture: ComponentFixture<TransferenciaStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaStockFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
