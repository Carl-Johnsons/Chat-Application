namespace PostService.Infrastructure.Persistence.Mockup.Data;

public class Tags
{
    public string Id { get; set; } = null!;
    public string Value { get; set; } = null!;
    public string Code { get; set; } = null!;
}

internal static class TagData
{
    public static IEnumerable<Tags> Data =>
        [
            new Tags {
                Id = "4bf09360-f3a6-4d04-b3f1-70c00fb3e8ef",
                Value = "comedy",
                Code = "COMEDY",
            },
            new Tags {
                Id = "bea3020e-35ff-4cd7-92df-792419b6b0ae",
                Value = "horror",
                Code = "HORROR",
            },
            new Tags {
                Id = "1c71ec2a-54e4-4014-b558-4dbf02360733",
                Value = "action",
                Code = "ACTION",
            },
            new Tags {
                Id = "9c1a9fcf-f36a-4260-bb0d-4db491cd4a20",
                Value = "question",
                Code = "QUESTION",
            },
            new Tags {
                Id = "6a555169-c6b6-426c-be57-11afcdda9616",
                Value = "answer",
                Code = "ANSWER",
            },
            new Tags {
                Id = "fbd3da75-c148-4c2b-8f46-94453df1ded4",
                Value = "dailylife",
                Code = "DAILYLIFE",
            }
        ];

}
