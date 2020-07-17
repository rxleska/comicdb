using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ComicDataAccess;

namespace ComicServices.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ComicController : ApiController
    {
        public IEnumerable<Comic> Get()
        {
            using (comicdatabaseEntities entities = new comicdatabaseEntities())
            {
                return entities.Comic.ToList();
            }
        }
        public Comic Get(int id)
        {
            using(comicdatabaseEntities entities = new comicdatabaseEntities())
            {
                return entities.Comic.FirstOrDefault(e => e.id == id);
            }
        }
        public void Put(int id, [FromBody]Comic comic)
        {
            using(comicdatabaseEntities entities = new comicdatabaseEntities())
            {
                var entity = entities.Comic.FirstOrDefault(e => e.id == id);
                entity.title = comic.title;
                entity.series = comic.series;
                entity.issueNumber = comic.issueNumber;
                entity.publisher = comic.publisher;
                entities.SaveChanges();
            }
        }
        public void Post([FromBody]Comic comic)
        {
            using(comicdatabaseEntities entities = new comicdatabaseEntities())
            {
                entities.Comic.Add(comic);
                entities.SaveChanges();
            }
        }
        public void Delete(int id)
        {
            using(comicdatabaseEntities entities = new comicdatabaseEntities())
            {
                entities.Comic.Remove(entities.Comic.FirstOrDefault(e => e.id == id));
                entities.SaveChanges();
            }
        }
    }
}
