import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetalleFormComponent } from './stock-detalle-form.component';

describe('StockDetalleFormComponent', () => {
  let component: StockDetalleFormComponent;
  let fixture: ComponentFixture<StockDetalleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetalleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
