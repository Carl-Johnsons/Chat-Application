using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmallChatApplication.Models;

namespace SmallChatApplication.Controllers
{
    public class ChatRoomController : Controller
    {
        public Users user;


        // GET: ChatRoomController
        [HttpGet]
        public ActionResult Index()
        {
            Console.WriteLine("Im in chat room yay");
            string userName = HttpContext.Request.Query["txtUser"];
            string room = HttpContext.Request.Query["txtRoom"];
            Console.WriteLine($"{userName} has joined {room}");

            user = new Users()
            {
                Name = userName,
                Room = room
            };



            if (user != null)
            {
                ViewData["_userName"] = user.Name;
            }
            else { 
                ViewData["_userName"] = "No one";

            }


            return View();
        }


        // GET: ChatRoomController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ChatRoomController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ChatRoomController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ChatRoomController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ChatRoomController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ChatRoomController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ChatRoomController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
