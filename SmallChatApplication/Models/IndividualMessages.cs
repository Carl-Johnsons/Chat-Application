using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmallChatApplication.Models
{
    [Table("IndividualMessages")]
    public class IndividualMessages
    {
        //Normal properties
        [Key]
        public Messages? Message { get; set; }
        public Users? ReceiverUser { get; set; }

        
    }
   
}
