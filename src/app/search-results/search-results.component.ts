import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Poster', 'Title', 'Year', 'Type'];

  results: any[] = [];
  subscription: Subscription;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.subscription = this.resultsService.results$.subscribe((results) => {
      this.results = results;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
