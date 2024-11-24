import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image?: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: Array<{
    topic: string;
    relevance_score: string;
  }>;
  sentiment: {
    title: string;
    content: string;
  };
}

export interface NewsResponse {
  items: NewsItem[];
  sentiment_score_definition: string;
  relevance_score_definition: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://www.alphavantage.co/query';
  private readonly apiKey = environment.alphaVantageApiKey;

  /**
   * Fetches news articles for specific tickers
   * @param symbols Array of stock symbols (e.g., ['IBM', 'AAPL'])
   * @param limit Maximum number of news items to return (default: 50, max: 1000)
   * @returns Observable of news items
   */
  getNewsForSymbols(symbols: string[], limit: number = 50): Observable<NewsItem[]> {
    const params = {
      function: 'NEWS_SENTIMENT',
      tickers: symbols.join(','),
      limit: limit.toString(),
      apikey: this.apiKey
    };

    return this.http.get<NewsResponse>(this.baseUrl, { params }).pipe(
      map(response => response.items || [])
    );
  }

  /**
   * Fetches news articles by topics
   * @param topics Array of topics (e.g., ['technology', 'earnings'])
   * @param limit Maximum number of news items to return (default: 50, max: 1000)
   * @returns Observable of news items
   */
  getNewsByTopics(topics: string[], limit: number = 50): Observable<NewsItem[]> {
    const params = {
      function: 'NEWS_SENTIMENT',
      topics: topics.join(','),
      limit: limit.toString(),
      apikey: this.apiKey
    };

    return this.http.get<NewsResponse>(this.baseUrl, { params }).pipe(
      map(response => response.items || [])
    );
  }

  /**
   * Fetches latest market news
   * @param limit Maximum number of news items to return (default: 50, max: 1000)
   * @returns Observable of news items
   */
  getLatestNews(limit: number = 50): Observable<NewsItem[]> {
    const params = {
      function: 'NEWS_SENTIMENT',
      limit: limit.toString(),
      sort: 'LATEST',
      apikey: this.apiKey
    };

    return this.http.get<NewsResponse>(this.baseUrl, { params }).pipe(
      map(response => response.items || [])
    );
  }
} 