using System;
using System.Collections.Generic;
using System.Linq;
using ComicDataAccess;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComicServicesCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ComicController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Comic> Get()
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            return entities.Comic.ToList();
        }

        [HttpGet("{id}")]
        public Comic Get(int id)
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            return entities.Comic.FirstOrDefault(e => e.id == id);

        }
        [HttpGet("series/{usr}")]
        public IEnumerable<Comic> Get(string usr)
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            {
                var usrComics =
                    from Comic comic in entities.Comic
                    where comic.series.Equals(usr)
                    select comic;
                return usrComics.ToList<Comic>();
            }

        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Comic comic)
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            {
                var entity = entities.Comic.FirstOrDefault(e => e.id == id);
                entity.title = comic.title;
                entity.series = comic.series;
                entity.issueNumber = comic.issueNumber;
                entity.publisher = comic.publisher;
                entities.SaveChanges();
            }
        }
        [HttpPost]
        public void Post([FromBody] Comic comic)
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            {
                entities.Comic.Add(comic);
                entities.SaveChanges();
            }
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            comicdatabaseContext entities = new comicdatabaseContext();
            {
                entities.Comic.Remove(entities.Comic.FirstOrDefault(e => e.id == id));
                entities.SaveChanges();
            }
        }
    }
}
