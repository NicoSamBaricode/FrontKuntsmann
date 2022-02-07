import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapasListComponent } from './etapas-list.component';

describe('EtapasListComponent', () => {
  let component: EtapasListComponent;
  let fixture: ComponentFixture<EtapasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
