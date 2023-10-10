﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace SmallChatApplication.Models
{
    [Table("Users")]
    public class Users
    {
        //Normal properties
        [Key]
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? Room { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? AvatarURL { get; set; }
        public bool Active { get; set; } = true;

        //Navigation properties
        public List<Messages>? Messages { get; set; }
        public List<Users>? Friends { get; set; }
        

    }
}
    