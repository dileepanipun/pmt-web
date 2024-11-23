import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChartTestComponent } from './stock-chart-test.component';

describe('StockChartTestComponent', () => {
  let component: StockChartTestComponent;
  let fixture: ComponentFixture<StockChartTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockChartTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockChartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
