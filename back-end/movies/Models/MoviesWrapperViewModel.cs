using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace movies.Models
{
    public class MoviesWrapperViewModel
    {
        public IEnumerable<MovieViewModel> Movies { get; set; }
        public int CurrentPage { get; set; }
        public int LastPage { get; set; }
    }
}