import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

import { MoviesListComponent }    from './movies-list.component';
import { MovieDetailComponent }  from './movie-detail.component';

import { MovieService } from './movie.service';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MoviesRoutingModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    MoviesListComponent,
    MovieDetailComponent
  ],
  providers: [
    MovieService
  ]
})
export class MoviesModule {}