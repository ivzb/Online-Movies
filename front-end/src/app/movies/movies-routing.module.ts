import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesListComponent }    from './movies-list.component';
import { MovieDetailComponent }  from './movie-detail.component';

const moviesRoutes: Routes = [
  { path: 'movies/:page',  component: MoviesListComponent },
  { path: 'movies/:search/:page',  component: MoviesListComponent },
  { path: 'movies',  component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MoviesRoutingModule { }