using Microsoft.AspNetCore.Mvc;
using ZooAPI.Model;
using ZooAPI.Service;

namespace ZooAPI.Controller // Namespace anpassen
{
    [ApiController] // Controller als API-Controller deklarieren
    [Route("api/[controller]")] // Basispfad: api/kassierer
    public class KassiererController : ControllerBase // Controller erbt von ControllerBase
    {
        private readonly KassiererService _service; // KassiererService-Objekt

        // KassiererService Injektion
        public KassiererController(KassiererService service)
        {
            _service = service;
        }

        // Ticketkauf: api/kassierer/buy
        [HttpPost("buy")]
        public async Task<ActionResult<Ticket>> InsertTicket(Ticket ticket) // Ticket-Objekt aus Request-Body
        {
            try
            {
                await _service.InsertTicketAsync(ticket);
                return CreatedAtAction(nameof(InsertTicket), new { id = ticket.Id }, ticket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Alle Tickets: api/kassierer/gettickets
        [HttpGet("tickets")]
        public async Task<ActionResult<List<Ticket>>> GetAllTickets()
        {
            try
            {
                return await _service.GetAllSoldTicketsAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Tickets nach Datum: api/kassierer/tickets/date/{date}
        [HttpGet("tickets/date/{date}")]
        public async Task<ActionResult<List<Ticket>>> GetTicketsByDate(DateTime date)
        {
            try
            {
                var (tickets, total) = await _service.GetTicketsByDate(date);
                return Ok(new { Tickets = tickets, Total = total });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    } 
}