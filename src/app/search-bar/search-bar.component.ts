import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultsService } from '../services/results.service';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, map, debounceTime } from 'rxjs/operators';
import { SearchResultItem } from '../interfaces/searchResultItem';

export interface SearchResults {
  Search?: SearchResultItem[];
  totalResults: string;
  Response: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  tipsSubject$: Subject<string>;
  tipsObservable$: Observable<SearchResultItem[]>;

  constructor(private http: HttpClient, private router: Router, private resultsService: ResultsService) { }

  ngOnInit() {
    this.tipsSubject$ = new Subject<string>();
    this.tipsObservable$ = this.tipsSubject$.pipe(
      filter((str: string) => str.length >= 5),
      debounceTime(500),
      switchMap(searchStr => this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=1&s=${searchStr}`)),
      map(
        (data) => {
          if (Array.isArray(data.Search)) {
            return [...data.Search.slice(0, 5)];
          }
        }
      )
    );
  }

  search(title: string) {
    console.log(title);
    this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=1&s=${title}`)
      .subscribe((data) => {
        console.log(data);
        // if no results data.Search is undefined
        if (!data.Search) { return; }

        this.resultsService.setResults(data.Search);

        // get more results (up to 20) if totalResults more than 10
        if (+data.totalResults > 10) {
          this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=2&s=${title}`).subscribe((data) => {
            this.resultsService.setResults([...this.resultsService.getResults(), ...data.Search]);
          });
        }

        // navigate to results component
        this.router.navigate(['results']);
      });
  }

}
