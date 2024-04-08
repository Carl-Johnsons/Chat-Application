using AuthService.Infrastructure.Repositories;
using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
{
    private readonly UserRepository _userRepository = new();
    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        _userRepository.Add(request.User);
    }
}
