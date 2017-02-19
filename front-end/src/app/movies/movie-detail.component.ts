import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { slideInDownAnimation } from '../animations';

import { MovieService } from './movie.service';
import { Movie } from './movie';
import { Actor } from './actor';
import { Genre } from '../genres/genre';
import { Country } from './country';

import 'rxjs/add/operator/pairwise';

declare var loader: any;

@Component({
  templateUrl: './movie-detail.template.html',
  animations: [ slideInDownAnimation ],
})
export class MovieDetailComponent implements OnInit {
    
    movie: Movie;
    actors: Actor[];
    genres: Genre[];
    countries: Country[];

    constructor(private route: ActivatedRoute, private router: Router, private service: MovieService, private sanitizer: DomSanitizer) {
        loader.start();
    }

    onSelect(movie: Movie) {
        this.router.navigate(['/movie', movie.Id]);
    }

    ngOnInit() {
      let id = +this.route.snapshot.params['id'];

      this.getMovie(id);
    }

    gotoMovies() {
      window.history.back();
    }

    sanitize(url:string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private getMovie(id: number) {
        this.service
            .getMovie(id)
            .then(movie => {
              this.movie = movie;
              this.actors = this.movie.Actors;
              this.genres = this.movie.Genres;
              this.countries = this.movie.Countries;
              loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }
}