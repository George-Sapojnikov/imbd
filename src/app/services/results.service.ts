import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SearchResultItem } from '../interfaces/searchResultItem';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  results: SearchResultItem[] = [];
  results$ = new BehaviorSubject<SearchResultItem[]>([]);

  constructor() { }

  setResults(results: SearchResultItem[]): void {
    this.results = [...results];
    this.results$.next(this.results);
  }

  getResults(): SearchResultItem[] {
    return this.results;
  }
}
