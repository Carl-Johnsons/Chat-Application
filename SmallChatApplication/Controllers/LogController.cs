using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmallChatApplication.DatabaseContext;

namespace SmallChatApplication.Controllers
{
    public class LogController : Controller
    {
        private readonly ChatApplicationContext context;
        public LogController()
        {
            context = new ChatApplicationContext();
        }

        // GET: LogController
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            string? Phone = HttpContext.Request.Query["Phone"];
            string? Password = HttpContext.Request.Query["Password"];

            var user = from u in context.Users
                       where u.Phone == Phone && u.Password == Password
                       select u;
            if (user == null)
            {
            }

            return View();
        }
        public ActionResult Register()
        {

            return View();
        }



        // GET: LogController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: LogController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: LogController/Create
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

        // GET: LogController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: LogController/Edit/5
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

        // GET: LogController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: LogController/Delete/5
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
