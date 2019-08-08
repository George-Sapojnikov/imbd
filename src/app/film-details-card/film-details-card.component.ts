import { Component, OnInit, Input } from '@angular/core';
import { FilmDetails } from '../interfaces/filmDetails';

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
