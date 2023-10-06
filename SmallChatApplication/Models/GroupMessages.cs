using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmallChatApplication.Models
{
    [Table("GroupMessages")]
    public class GroupMessages
    {
        //Normal properties
      
        public Messages Message { get; set; }
        public Groups? Group { get; set; }

       
    }

}
