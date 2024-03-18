using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMoreObject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image_URL",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "Invite_URL",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Conversation");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReadTime",
                table: "ConversationUser",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created_At",
                table: "Conversation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "GroupConversation",
                columns: table => new
                {
                    ConverastionId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image_URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Invite_URL = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupConversation", x => x.ConverastionId);
                    table.ForeignKey(
                        name: "FK__GroupConversation__Converastion",
                        column: x => x.ConverastionId,
                        principalTable: "Conversation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IndividualConversation",
                columns: table => new
                {
                    ConverastionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndividualConversation", x => x.ConverastionId);
                    table.ForeignKey(
                        name: "FK__IndividualConversation__Converastion",
                        column: x => x.ConverastionId,
                        principalTable: "Conversation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupConversation");

            migrationBuilder.DropTable(
                name: "IndividualConversation");

            migrationBuilder.DropColumn(
                name: "ReadTime",
                table: "ConversationUser");

            migrationBuilder.DropColumn(
                name: "Created_At",
                table: "Conversation");

            migrationBuilder.AddColumn<string>(
                name: "Image_URL",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Invite_URL",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
