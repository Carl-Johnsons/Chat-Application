using AuthService.Core.Entities;
using MediatR;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Register;
public sealed record RegisterCommand(User User) : IRequest;
