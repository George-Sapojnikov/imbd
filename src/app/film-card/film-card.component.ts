import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit, OnDestroy {
  id: string;
  details: {};
  httpGetSubscription: Subscription;
  paramMapSubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.paramMapSubscription = this.route.paramMap.subscribe( (paramMap) => {
      this.id = paramMap.get('id');
      this.getFilmObj(this.id);
    });
  }

  getFilmObj(id: string) {
    this.httpGetSubscription = this.http.get(`http://www.omdbapi.com/?apikey=35a8c198&i=${id}`)
    .subscribe( (details) => {
      this.details = details;
    });
  }

  ngOnDestroy(): void {
    this.httpGetSubscription.unsubscribe();
  }

}
