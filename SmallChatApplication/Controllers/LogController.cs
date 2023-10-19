using BussinessObject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SmallChatApplication.Exceptions;

namespace SmallChatApplication.Controllers
{
    public class LogController : Controller
    {
        const string BASE_ADDRESS = "https://localhost:7190";
        private readonly HttpClient _client;

        public LogController()
        {
            _client = new HttpClient();
        }

        // GET: LogController
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login()
        {
            string? Phone = HttpContext.Request.Form["txtLoginPhone"];
            string? Password = HttpContext.Request.Form["txtLoginPassword"];

            if (Phone == null || Password == null)
            {
                return View();
            }
            //Encode URI string to avoid special symbol such as "/" or "&" 
            string encodePhone = Uri.EscapeUriString(Phone);
            string encodePassword = Uri.EscapeUriString(Password);
            string url = BASE_ADDRESS + "/api/Users/Login/" + encodePhone + "/" + encodePassword;

            var message = new HttpRequestMessage(HttpMethod.Post, url);
            var response = await _client.SendAsync(message);
            //Receive response as JSON
            var resultContent = response.Content.ReadAsStringAsync().Result;
            var user = JsonConvert.DeserializeObject<User>(resultContent);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Login Successfully");
                //Add cookie
                CookieOptions cookieOptions = new CookieOptions()
                {
                    Path = "/",
                    Expires = DateTime.Now.AddDays(1)
                };
                string cookieName = "user";
                string cookieValue = user.PhoneNumber;
                Response.Cookies.Append(cookieName, cookieValue, cookieOptions);
                return Redirect("/ChatRoom");
            }
            else
            {
                Console.WriteLine("Login Falied");
                return Redirect("/Log");
            }
        }

        [HttpPost]
        public ActionResult Register()
        {
            string? Phone = HttpContext.Request.Form["txtRegisterPhone"];
            string? Password = HttpContext.Request.Form["txtRegisterPassword"];

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
