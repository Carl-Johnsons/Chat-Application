using DuendeIdentityServer.Models;

namespace DuendeIdentityServer.Data.Mockup.Data;

public static class FriendData
{
    public static IEnumerable<Friend> Data =>
            [
                new Friend {
                    UserId = "61c61ac7-291e-4075-9689-666ef05547ed",
                    FriendId = "bb06e4ec-f371-45d5-804e-22c65c77f67d",
                },
                new Friend {
                    UserId = "594a3fc8-3d24-4305-a9d7-569586d0604e",
                    FriendId = "61c61ac7-291e-4075-9689-666ef05547ed",
                },
                new Friend {
                    UserId = "594a3fc8-3d24-4305-a9d7-569586d0604e",
                    FriendId = "50e00c7f-39da-48d1-b273-3562225a5972",
                },
                new Friend {
                    UserId = "50e00c7f-39da-48d1-b273-3562225a5972",
                    FriendId = "bb06e4ec-f371-45d5-804e-22c65c77f67d",
                },
                new Friend {
                    UserId = "bb06e4ec-f371-45d5-804e-22c65c77f67d",
                    FriendId = "03e4b46e-b84a-43a9-a421-1b19e02023bb",
                },
            ];
}
