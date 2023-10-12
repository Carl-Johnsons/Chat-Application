using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmallChatApplication.Models
{
    [Table("Groups")]
    public class Groups
    {
        //Normal properties
        [Key]
        public int GroupID { get; set; }
        
        public string? GroupName { get; set; }

        public string? AvatarURL {  get; set; }
        
        public Users? GroupOwner { get; set; }
        //Navigation properties
        public List<Users>? GroupDeputies { get; set; }


    }

}
