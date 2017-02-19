import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { GenreService } from './genre.service';
import { MovieService } from '../movies/movie.service';
import { Genre } from './genre';
import { Movie } from '../movies/movie';

declare var loader: any;

@Component({
  templateUrl: '../movies/movies-list.template.html'
})
export class GenreDetailComponent implements OnInit {
    genreId: number;
    genre: Genre;
    movies: Movie[];
    currentPage: number;
    lastPage: number;

    constructor(private router: Router, private route: ActivatedRoute, private genreService: GenreService, private movieService: MovieService) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                loader.start();
                this.genreId = +this.route.snapshot.params['id'];
                this.currentPage = +this.route.snapshot.params['page'];
                if (isNaN(this.currentPage)) this.currentPage = 1;

                window.scrollTo(0, 0);

                this.getMovies(this.genreId, this.currentPage);
            }
        });
    }

    onSelect(movie: Movie) {
        this.router.navigate(['/movie', movie.Id]);
    }

    private getMovies(genreId: number, page: number) {
        this.movieService
            .getMoviesByGenre(genreId, page)
            .then(moviesWrapper => {
                this.movies = moviesWrapper.Movies;
                this.currentPage = moviesWrapper.CurrentPage;
                this.lastPage = moviesWrapper.LastPage;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.genreService.getGenre(id).then(genre => this.genre = genre);
    }
}