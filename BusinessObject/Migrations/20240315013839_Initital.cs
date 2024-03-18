using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Initital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Conversation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Image_URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Invite_URL = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    User_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Phone_Number = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    AvatarURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BackgroundURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Introduction = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenCreated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RefreshTokenExpired = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.User_ID);
                });

            migrationBuilder.CreateTable(
                name: "ConversationUser",
                columns: table => new
                {
                    Conversation_Id = table.Column<int>(type: "int", nullable: false),
                    User_Id = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConversationUser", x => new { x.Conversation_Id, x.User_Id });
                    table.ForeignKey(
                        name: "FK__ConversationUser__Conversation",
                        column: x => x.Conversation_Id,
                        principalTable: "Conversation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__ConversationUser__User",
                        column: x => x.User_Id,
                        principalTable: "User",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Friend",
                columns: table => new
                {
                    User_ID = table.Column<int>(type: "int", nullable: false),
                    Friend_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friend", x => new { x.User_ID, x.Friend_ID });
                    table.ForeignKey(
                        name: "FK__Friend__Friend_I__276EDEB3",
                        column: x => x.Friend_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK__Friend__User_ID__267ABA7A",
                        column: x => x.User_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateTable(
                name: "FriendRequest",
                columns: table => new
                {
                    Sender_ID = table.Column<int>(type: "int", nullable: false),
                    Receiver_ID = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendRequest", x => new { x.Sender_ID, x.Receiver_ID });
                    table.ForeignKey(
                        name: "FK__FriendReq__Recei__2A4B4B5E",
                        column: x => x.Receiver_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK__FriendReq__Sende__29572725",
                        column: x => x.Sender_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sender_Id = table.Column<int>(type: "int", nullable: false),
                    Conversation_Id = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Format = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_Conversation_Conversation_Id",
                        column: x => x.Conversation_Id,
                        principalTable: "Conversation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Message__Sender___37A5467C",
                        column: x => x.Sender_Id,
                        principalTable: "User",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConversationUser_User_Id",
                table: "ConversationUser",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Friend_Friend_ID",
                table: "Friend",
                column: "Friend_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequest_Receiver_ID",
                table: "FriendRequest",
                column: "Receiver_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Conversation_Id",
                table: "Message",
                column: "Conversation_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Sender_Id",
                table: "Message",
                column: "Sender_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConversationUser");

            migrationBuilder.DropTable(
                name: "Friend");

            migrationBuilder.DropTable(
                name: "FriendRequest");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Conversation");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
