using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace movies.Models
{
    public class MovieViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<int> Year { get; set; }
        public System.TimeSpan Timespan { get; set; }
        public string Source { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public bool IsAdult { get; set; }
        public int Views { get; set; }

        public ICollection<ActorViewModel> Actors { get; set; }
        public ICollection<GenreViewModel> Genres { get; set; }
        public ICollection<CountryViewModel> Countries { get; set; }
    
    }
}