import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasExcelFormComponent } from './ventas-excel-form.component';

describe('VentasExcelFormComponent', () => {
  let component: VentasExcelFormComponent;
  let fixture: ComponentFixture<VentasExcelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasExcelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasExcelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
