import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  films = [];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.films = this.historyService.getFilms();
  }

}
