import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

import { GenresListComponent }    from './genres-list.component';
import { GenreDetailComponent }   from './genre-detail.component';

import { GenreService } from './genre.service';
import { GenresRoutingModule } from './genres-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GenresRoutingModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    GenresListComponent,
    GenreDetailComponent
  ],
  providers: [
    GenreService,
  ]
})
export class GenresModule {}