import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: {}[] = [];

  constructor() { }

  addFilm(film: {}): void {
    this.history.unshift(film);
    if (this.history.length > 10) {
      this.history.pop();
    }
  }

  getFilms() {
    return this.history;
  }
}
