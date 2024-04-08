using AuthService.Core.DTOs;
using AuthService.Core.Entities;
using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Queries.GetCurrentUser;
public sealed record GetCurrentUserQuery(UserClaim? UserClaim) : IRequest<User?>;
