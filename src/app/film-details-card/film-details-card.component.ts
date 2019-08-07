import { Component, OnInit, Input } from '@angular/core';

export interface FilmDetails {
  Title: string;
  Year: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Actors: string;
  Language: string;
  Country: string;
  Plot: string;
  Ratings?: {Value: string}[];
}

@Component({
  selector: 'app-film-details-card',
  templateUrl: './film-details-card.component.html',
  styleUrls: ['./film-details-card.component.scss']
})
export class FilmDetailsCardComponent implements OnInit {
  @Input() filmDetails: FilmDetails;

  constructor() { }

  ngOnInit() {
  }

}
