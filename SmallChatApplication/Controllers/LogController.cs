using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmallChatApplication.Models;
using SmallChatApplication.DatabaseContext;
using SmallChatApplication.Repositories;
using SmallChatApplication.Exceptions;

namespace SmallChatApplication.Controllers
{
    public class LogController : Controller
    {
        private readonly ChatApplicationContext context;
        private UserRepository userRepository;
        public LogController()
        {
            context = new ChatApplicationContext();
            userRepository = new UserRepository();
        }

        // GET: LogController
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login()
        {
            string? Phone = HttpContext.Request.Form["txtLoginPhone"];
            string? Password = HttpContext.Request.Form["txtLoginPassword"];

            Users user;
            try
            {
                user = userRepository.GetActiveUsers(Phone, Password);
            }
            catch (AccountDisabledException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (AccountNotFoundException ex)
            {
                Console.WriteLine(ex.Message);
            }

            Console.WriteLine("Login Successfully");

            return Redirect("/Log");
        }

        [HttpPost]
        public ActionResult Register()
        {
            string? Phone = HttpContext.Request.Form["txtRegisterPhone"];
            string? Password = HttpContext.Request.Form["txtRegisterPassword"];

            Users user = new Users()
            {
                Phone = Phone,
                Password = Password
            };

            bool result = userRepository.AddUser(user);
            if (!result)
            {
                Console.WriteLine("Add failed");
            }
            else
            {
                Console.WriteLine("Add successful");
            }
            return Redirect("/Log");
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
