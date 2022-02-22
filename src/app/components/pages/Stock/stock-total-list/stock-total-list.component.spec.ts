import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTotalListComponent } from './stock-total-list.component';

describe('StockTotalListComponent', () => {
  let component: StockTotalListComponent;
  let fixture: ComponentFixture<StockTotalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTotalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTotalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
