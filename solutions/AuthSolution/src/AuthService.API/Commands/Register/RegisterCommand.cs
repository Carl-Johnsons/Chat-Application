using AuthService.Core.Entities;
using MediatR;

namespace AuthService.API.Commands.Register;

public class RegisterCommand : IRequest
{
    public User User { get; set; }
    public RegisterCommand(User user)
    {
        User = user;
    }
}
