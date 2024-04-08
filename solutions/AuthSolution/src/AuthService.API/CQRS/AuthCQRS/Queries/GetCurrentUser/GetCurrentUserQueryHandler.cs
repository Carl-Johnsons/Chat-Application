using AuthService.Core.Entities;
using AuthService.Infrastructure;
using AuthService.Infrastructure.Repositories;
using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Queries.GetCurrentUser;

public sealed class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, User?>
{
    private readonly ApplicationDbContext _context = new();
    private readonly UserRepository _userRepository = new();
    public Task<User?> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var UserClaim = request.UserClaim;
        if (UserClaim == null)
        {
            throw new Exception("User didn't log in");
        }
        var user = _userRepository.Get(UserClaim.UserId);
        return Task.FromResult(user);
    }
}
