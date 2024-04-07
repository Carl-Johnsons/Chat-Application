using AuthService.Core.Entities;
using AuthService.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthService.API.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
{
    private readonly ApplicationDbContext _context = new();
    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = request.User;

        var account = _context.Accounts
                              .Where(acc => acc.PhoneNumber == user.Account.PhoneNumber)
                              .SingleOrDefault();
        if (account != null)
        {
            throw new Exception("account not found");
        }
        _context.Users.Add(user);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
