using AuthService.Core.Entities;
using AuthService.Infrastructure;
using MediatR;

namespace AuthService.API.Queries.GetCurrentUser;

public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, User?>
{
    private readonly ApplicationDbContext _context = new();
    public Task<User?> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var CurrentUserClaim = request.UserClaim;
        if (CurrentUserClaim == null)
        {
            throw new Exception("User didn't log in");
        }
        var user = _context.Users.Where(u => u.Id == CurrentUserClaim.UserId).SingleOrDefault();
        return Task.FromResult(user);
    }
}
