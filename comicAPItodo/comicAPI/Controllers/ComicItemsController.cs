using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using comicAPI.Models;

namespace comicAPI.Controllers
{
    [Route("js/api/[controller]")]
    [ApiController]
    public class ComicItemsController : ControllerBase
    {
        private readonly ComicContext _context;

        public ComicItemsController(ComicContext context)
        {
            _context = context;
        }

        // GET: api/ComicItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComicItem>>> GetComicItems()
        {
            return await _context.ComicItems.ToListAsync();
        }

        // GET: api/ComicItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComicItem>> GetComicItem(long id)
        {
            var comicItem = await _context.ComicItems.FindAsync(id);

            if (comicItem == null)
            {
                return NotFound();
            }

            return comicItem;
        }

        // PUT: api/ComicItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComicItem(long id, ComicItem comicItem)
        {
            if (id != comicItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(comicItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComicItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ComicItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ComicItem>> PostComicItem(ComicItem comicItem)
        {
            _context.ComicItems.Add(comicItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComicItem", new { id = comicItem.Id }, comicItem);
        }

        // DELETE: api/ComicItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ComicItem>> DeleteComicItem(long id)
        {
            var comicItem = await _context.ComicItems.FindAsync(id);
            if (comicItem == null)
            {
                return NotFound();
            }

            _context.ComicItems.Remove(comicItem);
            await _context.SaveChangesAsync();

            return comicItem;
        }

        private bool ComicItemExists(long id)
        {
            return _context.ComicItems.Any(e => e.Id == id);
        }
    }
}
