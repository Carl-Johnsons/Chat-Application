using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BussinessObject.Models;
using WebChatApplication.Filter;

namespace SmallChatApplication.Controllers
{
    public class ChatRoomController : Controller
    {


        // GET: ChatRoomController
        [HttpGet]
        [Filter]
        public ActionResult Index()
        {

            return View();
        }


        // GET: ChatRoomController/Details/5
        [Filter]
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ChatRoomController/Create
        [Filter]
        public ActionResult Create()
        {
            return View();
        }

        // POST: ChatRoomController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Filter]
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
        [Filter]
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ChatRoomController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Filter]
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
        [Filter]
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
