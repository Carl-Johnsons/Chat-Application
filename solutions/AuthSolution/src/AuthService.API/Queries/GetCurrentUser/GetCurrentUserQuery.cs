using AuthService.Core.DTOs;
using AuthService.Core.Entities;
using MediatR;

namespace AuthService.API.Queries.GetCurrentUser;

public class GetCurrentUserQuery : IRequest<User?>
{
    public UserClaim? UserClaim { get; set; }
    public GetCurrentUserQuery(UserClaim? userClaim)
    {
        UserClaim = userClaim;
    }
}
