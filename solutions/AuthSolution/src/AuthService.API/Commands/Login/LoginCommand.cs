using AuthService.Core.DTOs;
using MediatR;

namespace AuthService.API.Commands.Login;

public class LoginCommand : IRequest<TokenResponse>
{
    public LoginDTO LoginDTO { get; set; } = null!;

    public LoginCommand(LoginDTO loginDTO)
    {
        LoginDTO = loginDTO;
    }
}
