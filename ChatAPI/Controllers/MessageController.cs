using BussinessObject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        public static List<Message> Messages = new List<Message>();
        private 
        [HttpGet]
        public IActionResult GetAll()
        {
            return 
        }
    }
}
