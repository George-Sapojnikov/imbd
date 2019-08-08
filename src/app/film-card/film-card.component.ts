import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { map, switchMap } from 'rxjs/operators';
import { FilmDetails } from '../interfaces/filmDetails';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit, OnDestroy {
  details$: Observable<FilmDetails>;
  addToHistorySubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient, private historyService: HistoryService) { }

  ngOnInit() {
    this.details$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.http.get<FilmDetails>(`https://www.omdbapi.com/?apikey=35a8c198&i=${id}`)),
    );

    this.addToHistorySubscription = this.details$.subscribe(details => this.historyService.addFilm(details));
  }

  ngOnDestroy(): void {
    this.addToHistorySubscription.unsubscribe();
  }

}
