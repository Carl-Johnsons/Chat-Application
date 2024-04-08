using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Refresh;
public sealed record RefreshCommand(string RefreshToken) : IRequest<string?>;
