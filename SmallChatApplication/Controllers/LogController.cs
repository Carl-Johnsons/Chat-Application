using BussinessObject.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SmallChatApplication.Exceptions;
using SmallChatApplication.Hubs;
using System.Drawing;
using System.Net.Http.Headers;
using System.Text;
using WebChatApplication.Libs;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var cookie = HttpContext.Request.Cookies["user"];
            if (cookie != null)
            {
                return Redirect("/ChatRoom");
            }

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
        public async Task<IActionResult> Register()
        {
            DateTime Dob;

            string? Phone = HttpContext.Request.Form["txtRegisterPhone"];
            string? Password = HttpContext.Request.Form["txtRegisterPassword"];
            string? Name = HttpContext.Request.Form["txtName"];
            string? Gender = HttpContext.Request.Form["txtGender"];
            string? DobValue = Request.Form["txtDoB"];
            DateTime.TryParse(DobValue, out Dob);

            if (Phone == null || Password == null || Name == null || Gender == null || DobValue == null)
            {
                return Redirect("/Log");

            }

            IFormFile Background = Request.Form.Files[0];
            IFormFile Avatar = Request.Form.Files[1];

            string BackGroundImgUrl = await Tool.UploadImageToImgur(Background);
            string AvatarImgUrl = await Tool.UploadImageToImgur(Avatar);



            User RegisterUser = new User();
            RegisterUser.PhoneNumber = Phone;
            RegisterUser.Password = Password;
            RegisterUser.Name = Name;
            RegisterUser.Gender = Gender;
            RegisterUser.Dob = Dob;
            RegisterUser.AvatarUrl = AvatarImgUrl;
            RegisterUser.BackgroundUrl = BackGroundImgUrl;

            using (var client = new HttpClient())
            {
                string url = BASE_ADDRESS + "/api/Users";
                var response = await client.PostAsJsonAsync(url, RegisterUser);
                var resultContent = response.Content.ReadAsStringAsync().Result;
                var user = JsonConvert.DeserializeObject<User>(resultContent);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Register Successfully");
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

    public class ImgurResponse
    {
        public ImgurData data { get; set; }
    }

    public class ImgurData
    {
        public string link { get; set; }
    }
}
