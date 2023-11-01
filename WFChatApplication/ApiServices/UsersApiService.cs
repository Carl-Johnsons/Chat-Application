using BussinessObject.Models;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace WFChatApplication.ApiServices
{
    public partial class ApiService
    {
        private const string USERS_API_BASE_ADDRESS = "api/Users";
        //------------------------------------ Tools --------------------------------------
        public static async Task<string> UploadImageToImgur(string FilePath)
        {
            if (FilePath != null && FilePath.Length > 0)
            {
                using (var httpClient = new HttpClient())
                {
                    using (var form = new MultipartFormDataContent())
                    {
                        byte[] fileBytes = File.ReadAllBytes(FilePath);
                        form.Add(new ByteArrayContent(fileBytes, 0, fileBytes.Length), "image", "image.png");
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Client-ID", "87da474f87f4754");
                        var img_response = await httpClient.PostAsync("https://api.imgur.com/3/upload", form);
                        var responseContent = await img_response.Content.ReadAsStringAsync();
                        var responseObject = JObject.Parse(responseContent);
                        // Get the URL of the uploaded image
                        string imageId = responseObject["data"]["id"].Value<string>();
                        string imageUrl = $"https://i.imgur.com/{imageId}.jpeg";
                        return imageUrl;
                    }
                }
            }
            return "img/user.png";
        }

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
