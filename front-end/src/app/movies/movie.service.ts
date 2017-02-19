import { Injectable }    from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';
import { MoviesWrapper } from './movies-wrapper';

@Injectable()
export class MovieService {
  private moviesServiceUrl = 'http://online-movies.azurewebsites.net/api/Movies/';
  private getMovieUrl = this.moviesServiceUrl + 'GetMovie/';
  private getMoviesUrl = this.moviesServiceUrl + 'GetMovies/';
  private getMoviesByGenreUrl = this.moviesServiceUrl + 'GetMoviesByGenre/';
  private searchMoviesUrl = this.moviesServiceUrl + 'SearchMovies/';

  constructor(private http: Http) { }

  getMovie(id: number): Promise<Movie> {
    return this.http.get(this.getMovieUrl + id)
      .toPromise()
      .then(response => response.json() as Movie)
      .catch(this.handleError);
  }

  getMovies(page: number): Promise<MoviesWrapper> {
    return this.http.get(this.getMoviesUrl + page)
      .toPromise()
      .then(response => response.json() as MoviesWrapper)
      .catch(this.handleError);
  }

  getMoviesByGenre(genreId: number, page: number): Promise<MoviesWrapper> {
    return this.http.get(this.getMoviesByGenreUrl + genreId + '/' + page)
      .toPromise()
      .then(response => response.json() as MoviesWrapper)
      .catch(this.handleError);
  }

  searchMovies(search: string, page: number): Promise<MoviesWrapper> {
    return this.http.get(this.searchMoviesUrl + search + '/' + page)
      .toPromise()
      .then(response => response.json() as MoviesWrapper)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}