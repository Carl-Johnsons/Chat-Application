using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConversationService.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAuditableEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConversationUser_Conversation_Conversation_Id",
                table: "ConversationUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Conversation_Conversation_Id",
                table: "Message");

            migrationBuilder.RenameColumn(
                name: "Sender_Id",
                table: "Message",
                newName: "SenderId");

            migrationBuilder.RenameColumn(
                name: "Conversation_Id",
                table: "Message",
                newName: "ConversationId");

            migrationBuilder.RenameColumn(
                name: "Attached_Files_URL",
                table: "Message",
                newName: "AttachedFilesURL");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Message",
                newName: "Updated_At");

            migrationBuilder.RenameIndex(
                name: "IX_Message_Conversation_Id",
                table: "Message",
                newName: "IX_Message_ConversationId");

            migrationBuilder.RenameColumn(
                name: "User_Id",
                table: "ConversationUser",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Conversation_Id",
                table: "ConversationUser",
                newName: "ConversationId");

            migrationBuilder.RenameIndex(
                name: "IX_ConversationUser_Conversation_Id",
                table: "ConversationUser",
                newName: "IX_ConversationUser_ConversationId");

            migrationBuilder.RenameColumn(
                name: "Invite_URL",
                table: "Conversation",
                newName: "InviteURL");

            migrationBuilder.RenameColumn(
                name: "Image_URL",
                table: "Conversation",
                newName: "ImageURL");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created_At",
                table: "Message",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated_At",
                table: "Conversation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_ConversationUser_Conversation_ConversationId",
                table: "ConversationUser",
                column: "ConversationId",
                principalTable: "Conversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Conversation_ConversationId",
                table: "Message",
                column: "ConversationId",
                principalTable: "Conversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConversationUser_Conversation_ConversationId",
                table: "ConversationUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Conversation_ConversationId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "Created_At",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "Updated_At",
                table: "Conversation");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Message",
                newName: "Sender_Id");

            migrationBuilder.RenameColumn(
                name: "ConversationId",
                table: "Message",
                newName: "Conversation_Id");

            migrationBuilder.RenameColumn(
                name: "AttachedFilesURL",
                table: "Message",
                newName: "Attached_Files_URL");

            migrationBuilder.RenameColumn(
                name: "Updated_At",
                table: "Message",
                newName: "Time");

            migrationBuilder.RenameIndex(
                name: "IX_Message_ConversationId",
                table: "Message",
                newName: "IX_Message_Conversation_Id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ConversationUser",
                newName: "User_Id");

            migrationBuilder.RenameColumn(
                name: "ConversationId",
                table: "ConversationUser",
                newName: "Conversation_Id");

            migrationBuilder.RenameIndex(
                name: "IX_ConversationUser_ConversationId",
                table: "ConversationUser",
                newName: "IX_ConversationUser_Conversation_Id");

            migrationBuilder.RenameColumn(
                name: "InviteURL",
                table: "Conversation",
                newName: "Invite_URL");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "Conversation",
                newName: "Image_URL");

            migrationBuilder.AddForeignKey(
                name: "FK_ConversationUser_Conversation_Conversation_Id",
                table: "ConversationUser",
                column: "Conversation_Id",
                principalTable: "Conversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Conversation_Conversation_Id",
                table: "Message",
                column: "Conversation_Id",
                principalTable: "Conversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
