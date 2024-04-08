using AuthService.Core.DTOs;
using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Login;

public sealed record LoginCommand(LoginDTO LoginDTO) :IRequest<TokenResponse>;
