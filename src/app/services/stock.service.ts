import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { StockResponse, CandlestickData, StockMetadata } from '../interfaces/stock-data.interface';

interface StockDataResult {
  candlesticks: CandlestickData[];
  metadata: StockMetadata;
}

interface CacheEntry {
  data: StockDataResult;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly http = inject(HttpClient);
  private readonly API_KEY = 'demo';
  private readonly BASE_URL = 'https://www.alphavantage.co/query';
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  private cache = new Map<string, CacheEntry>();

  getIntraDayData(symbol: string): Observable<StockDataResult> {
    // Check cache first
    const cachedData = this.getCachedData(symbol);
    if (cachedData) {
      return of(cachedData);
    }

    // If not in cache, fetch from API
    const params = {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval: '5min',
      apikey: this.API_KEY
    };

    return this.http.get<StockResponse>(this.BASE_URL, { params }).pipe(
      map(response => {
        const result = {
          candlesticks: this.transformData(response),
          metadata: this.transformMetadata(response['Meta Data'])
        };
        
        // Store in cache
        this.cache.set(symbol, {
          data: result,
          timestamp: Date.now()
        });

        return result;
      })
    );
  }

  private getCachedData(symbol: string): StockDataResult | null {
    const cached = this.cache.get(symbol);
    
    if (!cached) {
      return null;
    }

    // Check if cache has expired
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(symbol);
      return null;
    }

    return cached.data;
  }

  private transformData(response: StockResponse): CandlestickData[] {
    const timeSeries = response['Time Series (5min)'];
    return Object.entries(timeSeries).map(([timestamp, data]) => ({
      time: new Date(timestamp).getTime() / 1000,
      open: parseFloat(data['1. open']),
      high: parseFloat(data['2. high']),
      low: parseFloat(data['3. low']),
      close: parseFloat(data['4. close'])
    })).sort((a, b) => a.time - b.time);
  }

  private transformMetadata(metaData: StockResponse['Meta Data']): StockMetadata {
    return {
      information: metaData['1. Information'],
      symbol: metaData['2. Symbol'],
      lastRefreshed: metaData['3. Last Refreshed'],
      interval: metaData['4. Interval'],
      outputSize: metaData['5. Output Size'],
      timeZone: metaData['6. Time Zone']
    };
  }
}
