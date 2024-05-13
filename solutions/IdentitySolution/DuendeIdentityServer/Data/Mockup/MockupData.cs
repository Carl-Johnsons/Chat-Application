using DuendeIdentityServer.Data.Mockup.Data;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Serilog;

namespace DuendeIdentityServer.Data.Mockup;

public class MockupData
{
    public UserManager<ApplicationUser> _userManager;

    public MockupData(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
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
}
