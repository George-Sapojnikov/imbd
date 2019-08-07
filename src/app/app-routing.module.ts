import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path: 'results', component: SearchResultsComponent },
  { path: 'filmCard/:id', component: FilmCardComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
