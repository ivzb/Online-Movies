import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { GenreService } from './genre.service';
import { Genre } from './genre';

declare var loader: any;

@Component({
  templateUrl: './genres-list.template.html'
})
export class GenresListComponent implements OnInit {
    genres: Genre[];

    constructor(private router: Router, private route: ActivatedRoute, private service: GenreService) {
        loader.start()
    }

    onSelect(genre: Genre) {
        this.router.navigate(['/genre', genre.Id]);
    }

    private getGenres() {
        this.service
            .getGenres()
            .then(genres => {
                this.genres = genres;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }

    ngOnInit() {
        this.getGenres();
    }
}