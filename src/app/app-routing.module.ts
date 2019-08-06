import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilmCardComponent } from './film-card/film-card.component';


const routes: Routes = [
  { path: 'results', component: SearchResultsComponent },
  { path: 'filmCard/:id', component: FilmCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
