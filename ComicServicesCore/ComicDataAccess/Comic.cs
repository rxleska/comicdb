using System;
using System.Collections.Generic;

namespace ComicDataAccess
{
    public partial class Comic
    {
        public int id { get; set; }
        public string title { get; set; }
        public string series { get; set; }
        public string publisher { get; set; }
        public int issueNumber { get; set; }
    }
}
