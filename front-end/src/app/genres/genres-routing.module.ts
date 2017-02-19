import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenresListComponent }    from './genres-list.component';
import { GenreDetailComponent }   from './genre-detail.component';

const moviesRoutes: Routes = [
  { path: 'genres',  component: GenresListComponent },
  { path: 'genre/:id', component: GenreDetailComponent },
  { path: 'genre/:id/:page', component: GenreDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GenresRoutingModule { }