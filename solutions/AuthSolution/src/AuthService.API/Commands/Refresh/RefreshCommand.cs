using MediatR;

namespace AuthService.API.Commands.Refresh;

public class RefreshCommand : IRequest<string?>
{
    public string RefreshToken { get; set; }
    public RefreshCommand(string refreshToken)
    {
        RefreshToken = refreshToken;
    }
}
