using BussinessObject.Models;
using System.Net.Http.Json;

namespace WFChatApplication.ApiServices
{
    public partial class ApiServices
    {
        public static async Task<List<User>> GetUserListAsync(string _path)
        {
            using (var client = new HttpClient())
            {
                List<User> users = null;
                HttpResponseMessage response = await client.GetAsync(_path);
                if (response.IsSuccessStatusCode)
                {
                    users = await response.Content.ReadFromJsonAsync<List<User>>();
                }
                return users;
            }
        }


        public static async Task<User> GetUserAsync(string _path)
        {
            using (var client = new HttpClient())
            {
                User user = null;
                HttpResponseMessage response = await client.GetAsync(_path);
                if (response.IsSuccessStatusCode)
                {
                    user = await response.Content.ReadFromJsonAsync<User>();
                }
                return user;
            }
        }
    }
}
