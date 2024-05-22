using DuendeIdentityServer.Data.Mockup.Data;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DuendeIdentityServer.Data.Mockup;

public class MockupData
{
    public UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public MockupData(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public void SeedUserData()
    {
        foreach (var user in ApplicationUserData.Data)
        {
            var userResult = _userManager.FindByNameAsync(user.UserName).Result;
            if (userResult == null)
            {
                var result = _userManager.CreateAsync(user, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                Log.Debug($"{user.UserName} created");
            }
            Log.Debug($"{user.UserName} already exists");
        }
    }

    public async Task SeedFriendRequestData()
    {
        foreach (var friendRequest in FriendRequestData.Data)
        {
            var friendRq = _context.FriendRequests.Any(fR => ((fR.SenderId == friendRequest.SenderId && fR.ReceiverId == friendRequest.ReceiverId) ||
                                                                (fR.SenderId == friendRequest.ReceiverId && fR.ReceiverId == friendRequest.SenderId)));
            var friend = _context.Friends.Any(fR => ((fR.UserId == friendRequest.SenderId && fR.FriendId == friendRequest.ReceiverId) ||
                                                        (fR.UserId == friendRequest.ReceiverId && fR.FriendId == friendRequest.SenderId)));
            if (!friend && !friendRq)
            {
                await Console.Out.WriteLineAsync(friendRequest.SenderId + " ==== " + friendRequest.ReceiverId);
                await _context.FriendRequests.AddAsync(friendRequest);
                await _context.SaveChangesAsync();
            }
            Log.Debug($" SenderId: {friendRequest.SenderId} and ReceiverId {friendRequest.ReceiverId} already exist");
        }
    }

    public async Task SeedFriendData()
    {
        foreach (var friend in FriendData.Data)
        {
            var friendCheck = _context.Friends.Any(fR => (fR.UserId == friend.UserId && fR.FriendId == friend.FriendId) || 
                                                    (fR.UserId == friend.FriendId && fR.FriendId == friend.UserId));
            if (!friendCheck)
            {                
                await _context.Friends.AddAsync(friend);
                await _context.SaveChangesAsync();
            }
            Log.Debug($" UserId: {friend.UserId} and FriendId {friend.FriendId} already exist");
        }
    }
}

