using DuendeIdentityServer.Models;

namespace DuendeIdentityServer.Data.Mockup.Data;

public static class ApplicationUserData
{
    public static IEnumerable<ApplicationUser> Data =>
             [
                new ApplicationUser{
                    UserName = "alice",
                    Email = "AliceSmith@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456789",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Alice Smith",
                    Gender = "Nữ",
                    AvatarUrl = "https://tapchithucung.vn/Uploads/images/nhung-giong-cho-it-bi-benh.jpg",
                    BackgroundUrl = "https://tapchithucung.vn/Uploads/images/nhung-giong-cho-it-bi-benh.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser{
                    UserName = "bob",
                    Email = "BobSmith@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456788",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Bob Smith",
                    Gender = "Nam",
                    AvatarUrl = "https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg",
                    BackgroundUrl = "https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser
                {
                    UserName = "duc",
                    Email = "taiduc@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456787",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Nguyen Le Tai Duc",
                    Gender = "Nam",
                    AvatarUrl = "https://i.pinimg.com/736x/e2/07/8b/e2078be54495947309e0f68b59346f68.jpg",
                    BackgroundUrl = "https://i.pinimg.com/736x/e2/07/8b/e2078be54495947309e0f68b59346f68.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                }
    ];
}
