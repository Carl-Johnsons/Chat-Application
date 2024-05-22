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
                },
                new ApplicationUser {
                    UserName = "an",
                    Email = "minhan@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456786",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Minh An",
                    Gender = "Nam",
                    AvatarUrl = "https://moc247.com/wp-content/uploads/2023/12/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_9.jpg",
                    BackgroundUrl = "https://moc247.com/wp-content/uploads/2023/12/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_9.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "kian",
                    Email = "kianstrong@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456785",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Kian Strong",
                    Gender = "Nam",
                    AvatarUrl = "https://cdn.britannica.com/70/234870-004-B1BA3958/Orange-colored-cat-yawns-displaying-teeth.jpg",
                    BackgroundUrl = "https://cdn.britannica.com/70/234870-004-B1BA3958/Orange-colored-cat-yawns-displaying-teeth.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "cara",
                    Email = "cararose@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456784",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Cara Rose",
                    Gender = "Nam",
                    AvatarUrl = "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/11/07/USAT/71489907007-shark-1-c-braun.jpg",
                    BackgroundUrl = "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/11/07/USAT/71489907007-shark-1-c-braun.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "raina",
                    Email = "rainaduarte@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456783",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Raina Duarte",
                    Gender = "Nam",
                    AvatarUrl = "https://kb.rspca.org.au/wp-content/uploads/2018/11/tabby-cat-stairs.jpg",
                    BackgroundUrl = "https://kb.rspca.org.au/wp-content/uploads/2018/11/tabby-cat-stairs.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "mac",
                    Email = "macnelson@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456782",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Mac Nelson",
                    Gender = "Nam",
                    AvatarUrl = "https://cdn2.steamgriddb.com/icon_thumb/7d66788d9bbbdc992995a492075269a5.png",
                    BackgroundUrl = "https://cdn2.steamgriddb.com/icon_thumb/7d66788d9bbbdc992995a492075269a5.png",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "lainey",
                    Email = "laineyhart@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456781",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Lainey Hart",
                    Gender = "Nam",
                    AvatarUrl = "https://lohas.nicoseiga.jp/thumb/1794731i?",
                    BackgroundUrl = "https://lohas.nicoseiga.jp/thumb/1794731i?",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                },
                new ApplicationUser {
                    UserName = "willa",
                    Email = "willapark@email.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0123456780",
                    PhoneNumberConfirmed = true,
                    /* Custom attribute */
                    Name = "Willa Park",
                    Gender = "Nam",
                    AvatarUrl = "https://hedwig-cf.netmarble.com/forum-common/mherosgb/futurefight_en/thumbnail/3f5b37a14e6d44b18ca7e72588ca631d_1557418504970_d.jpg",
                    BackgroundUrl = "https://hedwig-cf.netmarble.com/forum-common/mherosgb/futurefight_en/thumbnail/3f5b37a14e6d44b18ca7e72588ca631d_1557418504970_d.jpg",
                    Active = true,
                    Dob = new DateTime(2005, 12, 3)
                }
    ];
}
