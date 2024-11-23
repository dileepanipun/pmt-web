import { Component, OnInit, ElementRef, ViewChild, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { CandlestickData, StockMetadata } from '../../interfaces/stock-data.interface';
import { createChart, IChartApi } from 'lightweight-charts';

@Component({
  selector: 'app-stock-chart-test',
  templateUrl: './stock-chart-test.component.html',
  styleUrls: ['./stock-chart-test.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class StockChartTestComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private chart: IChartApi | null = null;
  private candlestickSeries: any = null;
  private readonly stockService = inject(StockService);

  // Using signals for reactive state management
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  public metadata = signal<StockMetadata | null>(null);

  private resizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    this.loadChartData();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.remove();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initChart(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      layout: {
        background: { color: '#080A0C' },
        textColor: '#ccd6f6',
      },
      grid: {
        vertLines: { color: '#15181C' },
        horzLines: { color: '#15181C' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#15181C',
        rightOffset: 0,
        fixLeftEdge: true,
        fixRightEdge: true,
        barSpacing: 8,
        minBarSpacing: 8,
        rightBarStaysOnScroll: true,
        lockVisibleTimeRangeOnResize: true,
      },
      crosshair: {
        vertLine: {
          color: '#ff8900',
          width: 1,
          style: 3,
          labelBackgroundColor: '#ff8900',
        },
        horzLine: {
          color: '#ff8900',
          width: 1,
          style: 3,
          labelBackgroundColor: '#ff8900',
        },
      },
    });

    this.resizeObserver = new ResizeObserver(entries => {
      if (this.chart) {
        const newWidth = entries[0].contentRect.width;
        this.chart.applyOptions({ width: newWidth });
      }
    });

    this.resizeObserver.observe(this.chartContainer.nativeElement);

    this.candlestickSeries = this.chart.addCandlestickSeries({
      upColor: '#ff8900',
      downColor: '#4A4A4D',
      borderUpColor: '#ff8900',
      borderDownColor: '#4A4A4D',
      wickUpColor: '#ff8900',
      wickDownColor: '#4A4A4D',
    });
  }

  private loadChartData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.stockService.getIntraDayData('IBM').subscribe({
      next: (data) => {
        this.metadata.set(data.metadata);
        this.updateChart(data.candlesticks);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load stock data');
        this.isLoading.set(false);
        console.error('Error loading stock data:', err);
      }
    });
  }

  private updateChart(candlesticks: CandlestickData[]): void {
    if (this.chart && this.candlestickSeries) {
      this.candlestickSeries.setData(candlesticks as []);
    }
  }
}
