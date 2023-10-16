using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class ImageMessage
{
    public int MessageId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public virtual Message Message { get; set; } = null!;
}
