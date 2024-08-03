﻿using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationService.Domain.Common;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
