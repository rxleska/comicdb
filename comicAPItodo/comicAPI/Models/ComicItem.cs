using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comicAPI.Models
{
    public class ComicItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Series { get; set; }
        public string Publisher { get; set; }
        public string IssueNumber { get; set; }
    }
}
