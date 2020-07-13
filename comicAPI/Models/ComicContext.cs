using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace comicAPI.Models
{
    public class ComicContext : DbContext
    {
        public ComicContext(DbContextOptions<ComicContext> options)
            : base(options)
        {

        }

        public DbSet<ComicItem> ComicItems { get; set; }
    }
}
