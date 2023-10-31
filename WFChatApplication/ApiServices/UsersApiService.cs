using BussinessObject.Models;
using System.Net.Http.Json;

namespace WFChatApplication.ApiServices
{
    public partial class ApiService
    {
        private const string USERS_API_BASE_ADDRESS = "api/Users/";
        //================================== GET SECTION ==================================
        public static async Task<List<User>> GetUserListAsync()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}";
                    List<User> users = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        users = await response.Content.ReadFromJsonAsync<List<User>>();
                    }
                    return users;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<User> GetUserAsync(int id)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    User user = null;
                    string url = $"{USERS_API_BASE_ADDRESS}/{id}";
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        user = await response.Content.ReadFromJsonAsync<User>();
                    }
                    return user;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<List<Friend>> GetFriendAsync(int userId)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}/GetFriend/{userId}";
                    List<Friend> friends = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        friends = await response.Content.ReadFromJsonAsync<List<Friend>>();
                    }
                    return friends;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<User> SearchUserAsync(string phoneNumber)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}/Search/{phoneNumber}";
                    User user = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        user = await response.Content.ReadFromJsonAsync<User>();
                    }
                    return user;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<List<FriendRequest>> GetFriendRequestsByReceiverId(int receiverId)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}/GetFriendRequestsByReceiverId/{receiverId}";
                    List<FriendRequest> friendRequests = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        friendRequests = await response.Content.ReadFromJsonAsync<List<FriendRequest>>();
                    }
                    return friendRequests;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }

        //================================== POST SECTION ==================================
        public static async Task<User> LoginAsync(string phoneNumber, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}/Login/{phoneNumber}/{password}";
                    User user = null;
                    HttpResponseMessage response = await client.PostAsync(url, null);
                    if (response.IsSuccessStatusCode)
                    {
                        user = await response.Content.ReadFromJsonAsync<User>();
                    }
                    return user;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        //================================== PUT SECTION ==================================
        public static async Task UpdateUserAsync(int id, User user)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{USERS_API_BASE_ADDRESS}/{id}";
                    HttpResponseMessage response = await client.PutAsJsonAsync(url, user);
                    response.EnsureSuccessStatusCode();
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
        }
    }
}
