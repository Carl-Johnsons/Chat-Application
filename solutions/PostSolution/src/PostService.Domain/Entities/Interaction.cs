using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostService.Domain.Entities;

[Table("Interaction")]
[PrimaryKey(nameof(Id))]
public class Interaction : BaseEntity
{
    [Required]
    [JsonProperty("value")]
    public string Value { get; set; } = null!;

    [Required]
    [JsonProperty("code")]
    public string Code { get; set; } = null!;
}
