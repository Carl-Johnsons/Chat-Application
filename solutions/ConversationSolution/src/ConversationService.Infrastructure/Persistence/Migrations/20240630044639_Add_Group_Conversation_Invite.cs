using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConversationService.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Group_Conversation_Invite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InviteURL",
                table: "Conversation");

            migrationBuilder.CreateTable(
                name: "GroupConversationInvite",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupConversationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupConversationInvite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupConversationInvite_Conversation_GroupConversationId",
                        column: x => x.GroupConversationId,
                        principalTable: "Conversation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupConversationInvite_GroupConversationId",
                table: "GroupConversationInvite",
                column: "GroupConversationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupConversationInvite");

            migrationBuilder.AddColumn<string>(
                name: "InviteURL",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
