using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using movies;
using movies.Models;

namespace movies.Controllers
{
    public class MoviesController : BaseController
    {
        private const int PageSize = 20;
        private const int PageOffset = 1;

        [ResponseType(typeof(MovieViewModel))]
        [CacheWebApi(Duration = 60)]
        [Route("api/Movies/GetMovie/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            Movie movie = db.Movies1.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            this.db.MoviesViews.Add(new MoviesView
            {
                MovieId = id,
                Date = DateTime.Now,
            });
            this.db.SaveChanges();

            MovieViewModel result = new MovieViewModel
            {
                Id = movie.Id,
                Title = movie.Title,
                Year = movie.Year,
                Timespan = movie.Timespan,
                Source = movie.Source,
                Description = movie.Description,
                ImageURL = movie.ImageURL,
                IsAdult = movie.IsAdult,
                Views = movie.MoviesViews.Count,
                Actors = movie.Actors.Select(x => new ActorViewModel
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList(),
                Countries = movie.Countries.Select(x => new CountryViewModel
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList(),
                Genres = movie.Genres.Select(x => new GenreViewModel
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList(),
            };

            return Ok(result);
        }

        [ResponseType(typeof(MoviesWrapperViewModel))]
        [HttpGet]
        [CacheWebApi(Duration = 60)]
        [Route("api/Movies/GetMovies/{page}")]
        public IHttpActionResult GetMovies(int page)
        {
            IQueryable<Movie> movies = db.Movies1;

            int moviesCount = movies.Count();
            int lastPage = (moviesCount / PageSize) + PageOffset;

           IEnumerable<MovieViewModel> moviesResult = movies
               .OrderByDescending(x => x.Year)
               .ThenByDescending(x => x.Id)
               .Skip(PageSize * (page - PageOffset))
               .Take(PageSize)
               .Select(movie => new MovieViewModel
                {
                    Id = movie.Id,
                    Title = movie.Title,
                    ImageURL = movie.ImageURL,
                    Genres = movie.Genres.Select(x => new GenreViewModel
                    {
                        Id = x.Id,
                        Name = x.Name
                    }).ToList(), 
                });

            MoviesWrapperViewModel result = new MoviesWrapperViewModel
            {
                Movies = moviesResult,
                CurrentPage = page,
                LastPage = lastPage
            };

            return this.Ok(result);
        }

        [ResponseType(typeof(MoviesWrapperViewModel))]
        [HttpGet]
        [CacheWebApi(Duration = 60)]
        [Route("api/Movies/GetMoviesByGenre/{genreId}/{page}")]
        public IHttpActionResult GetMoviesByGenre(int genreId, int page)
        {
            Genre genre = db.Genres.Find(genreId);

            if (genre == null)
            {
                return NotFound();
            }

            int moviesCount = genre.Movies.Count();
            int lastPage = (moviesCount / PageSize) + PageOffset;

           IEnumerable<MovieViewModel> moviesResult = genre.Movies
                .OrderByDescending(x => x.Year)
                .ThenByDescending(x => x.Id)
                .Skip(PageSize * (page - PageOffset))
                .Take(PageSize)
                .Select(movie => new MovieViewModel
                {
                    Id = movie.Id,
                    Title = movie.Title,
                    ImageURL = movie.ImageURL,
                    Genres = movie.Genres.Select(x => new GenreViewModel
                    {
                        Id = x.Id,
                        Name = x.Name
                    }).ToList(),
                });

            MoviesWrapperViewModel result = new MoviesWrapperViewModel
            {
                Movies = moviesResult,
                CurrentPage = page,
                LastPage = lastPage
            };

            return this.Ok(result);
        }

        [ResponseType(typeof(MoviesWrapperViewModel))]
        [HttpGet]
        [CacheWebApi(Duration = 60)]
        [Route("api/Movies/SearchMovies/{search}/{page}")]
        public IHttpActionResult SearchMovies(string search, int page)
        {
            IQueryable<Movie> movies = db.Movies1
                .Where(x => x.Title.Contains(search));

            int moviesCount = movies.Count();
            int lastPage = (moviesCount / PageSize) + PageOffset;

           IEnumerable<MovieViewModel> moviesResult = movies
                .OrderByDescending(x => x.Year)
                .ThenByDescending(x => x.Id)
                .Skip(PageSize * (page - PageOffset))
                .Take(PageSize)
                .Select(movie => new MovieViewModel
                {
                    Id = movie.Id,
                    Title = movie.Title,
                    ImageURL = movie.ImageURL,
                    Genres = movie.Genres.Select(x => new GenreViewModel
                    {
                        Id = x.Id,
                        Name = x.Name
                    }).ToList(),
                });

            MoviesWrapperViewModel result = new MoviesWrapperViewModel
            {
                Movies = moviesResult,
                CurrentPage = page,
                LastPage = lastPage
            };

            return this.Ok(result);
        }
    }
}