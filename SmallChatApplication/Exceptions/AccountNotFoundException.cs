namespace SmallChatApplication.Exceptions
{
    public class AccountNotFoundException : Exception
    {
        public AccountNotFoundException() : base("Account not found") { }
        public AccountNotFoundException(string message) : base(message) { }
        public AccountNotFoundException(string message, Exception innerException) : base(message, innerException) { }
    }
}
