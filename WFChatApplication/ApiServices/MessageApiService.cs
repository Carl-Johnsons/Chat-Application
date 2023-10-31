using BussinessObject.Models;
using Newtonsoft.Json;
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
        public static async Task<List<IndividualMessage>> GetIndividualMessageListAsync()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}/GetIndividualMessage";
                    List<IndividualMessage> individualMessages = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        individualMessages = await response.Content.ReadFromJsonAsync<List<IndividualMessage>>();
                    }
                    return individualMessages;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        public static async Task<IndividualMessage> GetIndividualMessageAsync(int senderId, int receiverId)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}/{id}";
                    IndividualMessage individualMessage = null;
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        individualMessage = await response.Content.ReadFromJsonAsync<IndividualMessage>();
                    }
                    return individualMessage;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }

        //================================== POST SECTION ==================================
        public static async Task<IndividualMessage> SendIndividualMessageAsync(IndividualMessage individualMessage)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}/SendIndividualMessage";
                    HttpResponseMessage response = await client.PostAsJsonAsync(url, individualMessage);
                    if (response.IsSuccessStatusCode)
                    {
                        individualMessage = await response.Content.ReadFromJsonAsync<IndividualMessage>();
                    }
                    return individualMessage;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return null;
        }
        //================================== DELETE SECTION ==================================
        public static async Task DeleteMessage(int messageId)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BASE_ADDRESS);
                    string url = $"{MESSAGES_API_BASE_ADDRESS}/DeleteMessage/{messageId}";
                    HttpResponseMessage response = await client.DeleteAsync(url);
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
