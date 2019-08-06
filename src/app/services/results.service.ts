import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  results: any[] = [];
  results$ = new BehaviorSubject<any[]>([]);

  constructor() { }

  setResults(results: any[]): void {
    this.results = [...results];
    this.results$.next(this.results);
  }

  getResults(): any[] {
    return this.results;
  }
}
