using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConversationService.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateKeyConversationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ConversationUser",
                table: "ConversationUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ConversationUser",
                table: "ConversationUser",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ConversationUser_Conversation_Id",
                table: "ConversationUser",
                column: "Conversation_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ConversationUser",
                table: "ConversationUser");

            migrationBuilder.DropIndex(
                name: "IX_ConversationUser_Conversation_Id",
                table: "ConversationUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ConversationUser",
                table: "ConversationUser",
                columns: new[] { "Conversation_Id", "User_Id" });
        }
    }
}
