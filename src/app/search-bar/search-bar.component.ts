import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultsService } from '../services/results.service';
import { Observable, Subject, forkJoin, Subscription } from 'rxjs';
import { filter, switchMap, map, debounceTime, tap, takeWhile } from 'rxjs/operators';
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
export class SearchBarComponent implements OnInit, OnDestroy {
  tipsSubject$: Subject<string>;
  tipsObservable$: Observable<SearchResultItem[]>;
  searchSubject$: Subject<string>;
  searchObservable$: Observable<[SearchResults, SearchResults]>;
  searchObservableSub: Subscription;

  isSearching: boolean;

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

    this.searchSubject$ = new Subject<string>();
    this.searchObservable$ = this.searchSubject$.pipe(
      tap( () => this.isSearching = true ),
      switchMap(searchString => {
        return forkJoin(
          this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=1&s=${searchString}`),
          this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=2&s=${searchString}`)
        );
      }),
      tap((results) => {
        const searchResults = [];

        results.forEach((searchResult) => {
          if (!!searchResult.Search) {
            searchResults.push(...searchResult.Search);
          }
        });

        if (!!searchResults.length) {
          this.resultsService.setResults(searchResults);
        } else {
          this.resultsService.setResults([{ Title: '', Poster: '', Year: 'Not Found', Type: 'Not Found', imdbID: 'Not Found' }]);
        }
        this.router.navigate(['results']);
      }),
      tap( () => this.isSearching = false ),
    );

    this.searchObservableSub = this.searchObservable$.subscribe();

  }

  // search(title: string) {
  //   console.log(title);
  //   this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=1&s=${title}`)
  //     .subscribe((data) => {
  //       console.log(data);
  //       // if no results data.Search is undefined
  //       if (!data.Search) { return; }

  //       this.resultsService.setResults(data.Search);

  //       // get more results (up to 20) if totalResults more than 10
  //       if (+data.totalResults > 10) {
  //         this.http.get<SearchResults>(`https://www.omdbapi.com/?apikey=35a8c198&page=2&s=${title}`).subscribe((data) => {
  //           this.resultsService.setResults([...this.resultsService.getResults(), ...data.Search]);
  //         });
  //       }

  //       // navigate to results component
  //       this.router.navigate(['results']);
  //     });
  // }

  ngOnDestroy(): void {
    this.searchObservableSub.unsubscribe();
  }

}
