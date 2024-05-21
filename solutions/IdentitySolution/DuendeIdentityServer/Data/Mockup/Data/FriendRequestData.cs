using DuendeIdentityServer.Models;

namespace DuendeIdentityServer.Data.Mockup.Data;

public static class FriendRequestData
{
    public static IEnumerable<FriendRequest> Data =>
            [
                new FriendRequest {
                    SenderId = "03e4b46e-b84a-43a9-a421-1b19e02023bb",
                    ReceiverId = "078ecc42-7643-4cff-b851-eeac5ba1bb29",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow                    
                },
                new FriendRequest {
                    SenderId = "03e4b46e-b84a-43a9-a421-1b19e02023bb",
                    ReceiverId = "1cfb7c40-cccc-4a87-88a9-ff967d8dcddb",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                },
                new FriendRequest {
                    SenderId = "1cfb7c40-cccc-4a87-88a9-ff967d8dcddb",
                    ReceiverId = "078ecc42-7643-4cff-b851-eeac5ba1bb29",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                },
                new FriendRequest {
                    SenderId = "50e00c7f-39da-48d1-b273-3562225a5972",
                    ReceiverId = "03e4b46e-b84a-43a9-a421-1b19e02023bb",

                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                },
                new FriendRequest {
                    SenderId = "50e00c7f-39da-48d1-b273-3562225a5972",
                    ReceiverId = "1cfb7c40-cccc-4a87-88a9-ff967d8dcddb",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                }

            ];
}
