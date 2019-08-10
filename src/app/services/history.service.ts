import { Injectable } from '@angular/core';
import { FilmDetails } from '../interfaces/filmDetails';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: FilmDetails[] = [];

  constructor() { }

  addFilm(film: FilmDetails): void {
    this.history.unshift(film);
    if (this.history.length > 10) {
      this.history.pop();
    }
  }

  getFilms(): FilmDetails[] {
    return this.history;
  }
}
