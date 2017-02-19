using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace movies.Models
{
    public class GenreViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MoviesCount { get; set; }
    }
}