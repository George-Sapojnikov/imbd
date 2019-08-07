import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultsService } from '../services/results.service';
import { map } from 'rxjs/operators';

export interface SearchResults {
  Search?: {}[];
  totalResults: string;
  Response: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  results = [];
  tips = [];

  constructor(private http: HttpClient, private router: Router, private resultsService: ResultsService) { }

  ngOnInit() {
  }

  showTips(title: string) {
    if (title.length >= 5) {
      this.http.get(`http://www.omdbapi.com/?apikey=35a8c198&page=1&s=${title}`)
        .subscribe((data: any) => {
          if (Array.isArray(data.Search)) {
            this.tips = [...data.Search.slice(0, 5)];
            console.log('Tips array: ', this.tips);
          }
        });
    }
  }

  search(title: string) {
    console.log(title);
    this.http.get<SearchResults>(`http://www.omdbapi.com/?apikey=35a8c198&page=1&s=${title}`)
      .subscribe((data) => {
        console.log(data);
        // if no results data.Search is undefined
        if (!data.Search) { return; }

        this.resultsService.setResults(data.Search);

        // get more results (up to 20) if totalResults more than 10
        if (+data.totalResults > 10) {
          this.http.get<SearchResults>(`http://www.omdbapi.com/?apikey=35a8c198&page=2&s=${title}`).subscribe((data) => {
            this.resultsService.setResults([...this.resultsService.getResults(), ...data.Search]);
          });
        }

        // navigate to results component
        this.router.navigate(['results']);
      });
  }

}
