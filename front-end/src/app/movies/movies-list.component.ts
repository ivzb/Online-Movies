import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MovieService } from './movie.service';
import { Movie } from './movie';
import { MoviesWrapper } from './movies-wrapper';

declare var loader: any;

@Component({
  templateUrl: './movies-list.template.html'
})
export class MoviesListComponent {
    movies: Movie[];
    currentPage: number;
    lastPage: number;
    search: string;

    constructor(private router: Router, private route: ActivatedRoute, private service: MovieService) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                loader.start();

                this.search = this.route.snapshot.params['search'];
                this.currentPage = +this.route.snapshot.params['page'];
                if (isNaN(this.currentPage)) this.currentPage = 1;
                window.scrollTo(0, 0);

                if (this.search != undefined) {
                    this.searchMovies(this.search, this.currentPage);
                } else {
                    this.getMovies(this.currentPage);
                }
            }
        });
    }

    onSelect(movie: Movie) {
        this.router.navigate(['/movie', movie.Id]);
    }

    private getMovies(page: number) {
        this.service
            .getMovies(page)
            .then(moviesWrapper => {
                this.movies = moviesWrapper.Movies;
                this.currentPage = moviesWrapper.CurrentPage;
                this.lastPage = moviesWrapper.LastPage;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }

    private searchMovies(search: string, page: number) {
        this.service
            .searchMovies(search, page)
            .then(moviesWrapper => {
                this.movies = moviesWrapper.Movies;
                this.currentPage = moviesWrapper.CurrentPage;
                this.lastPage = moviesWrapper.LastPage;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }
}