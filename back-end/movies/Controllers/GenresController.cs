using movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace movies.Controllers
{
    public class GenresController : BaseController
    {
        [CacheWebApi(Duration = 60)]
        [Route("api/Genres/GetGenres")]
        public IQueryable<GenreViewModel> GetGenres()
        {
           return db.Genres.OrderByDescending(x => x.Movies.Count).Select(genre => new GenreViewModel
            {
                Id = genre.Id,
                Name = genre.Name,
                MoviesCount = genre.Movies.Count
            });
        }

        [ResponseType(typeof(MovieViewModel))]
        [CacheWebApi(Duration = 60)]
        [Route("api/Genres/GetGenre/{id}")]
        public IHttpActionResult GetGenre(int id)
        {
            Genre genre = db.Genres.Find(id);
            if (genre == null)
            {
                return NotFound();
            }

            GenreViewModel result = new GenreViewModel 
            {
                Id = genre.Id,
                Name = genre.Name
            };

            return Ok(result);
        }
    }
}