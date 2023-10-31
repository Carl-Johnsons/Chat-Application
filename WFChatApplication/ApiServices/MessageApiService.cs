using System.Net.Http.Json;
using Message = BussinessObject.Models.Message;

namespace WFChatApplication.ApiServices
{
    public partial class ApiService
    {
        private const string MESSAGES_API_BASE_ADDRESS = "api/Messages/";
        //================================== GET SECTION ==================================
        public static async Task<List<Message>> GetMessageListAsync()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}";
                    List<Message> messages = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        messages = await response.Content.ReadFromJsonAsync<List<Message>>();
                    }
                    return messages;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<Message> GetMessageAsync(int id)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}/{id}";
                    Message message = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        message = await response.Content.ReadFromJsonAsync<Message>();
                    }
                    return message;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
    }
}
