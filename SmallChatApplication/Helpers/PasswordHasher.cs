using System.Security.Cryptography;
using System.Text;

namespace SmallChatApplication.Helpers
{
    public class PasswordHasher
    {

        public static string? GenerateMD5Hash(string? input)
        {
            if (input == null)
            {
                return null;
            }

            using (MD5 md5 = MD5.Create())
            {
                byte[] inputByte = Encoding.UTF8.GetBytes(input);
                byte[] hashByte = md5.ComputeHash(inputByte);

                StringBuilder strBuilder = new StringBuilder();

                for (int i = 0; i < hashByte.Length; i++)
                {
                    strBuilder.Append(hashByte[i].ToString("x2"));
                }
                return strBuilder.ToString();
            }
        }
    }
}
