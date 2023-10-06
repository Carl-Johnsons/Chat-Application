namespace SmallChatApplication.Exceptions
{
    public class AccountDisabledException : Exception
    {
        public AccountDisabledException() : base("Account is disabled") { }
        public AccountDisabledException(string message) : base(message) { }
        public AccountDisabledException(string message, Exception innerException) : base(message, innerException) { }
    }
}
