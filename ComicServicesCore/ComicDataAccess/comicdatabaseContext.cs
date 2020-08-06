using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ComicDataAccess
{
    public partial class comicdatabaseContext : DbContext
    {
        public comicdatabaseContext()
        {
        }

        public comicdatabaseContext(DbContextOptions<comicdatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comic> Comic { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("data source=BUTTERFLY;initial catalog=comicdatabase;integrated security=True;MultipleActiveResultSets=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comic>(entity =>
            {
                entity.Property(e => e.id).HasColumnName("id");

                entity.Property(e => e.issueNumber).HasColumnName("issueNumber");

                entity.Property(e => e.publisher)
                    .HasColumnName("publisher")
                    .HasMaxLength(50);

                entity.Property(e => e.series)
                    .HasColumnName("series")
                    .HasMaxLength(50);

                entity.Property(e => e.title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
