import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesFormComponent } from './comprobantes-form.component';

describe('ComprobantesFormComponent', () => {
  let component: ComprobantesFormComponent;
  let fixture: ComponentFixture<ComprobantesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobantesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
