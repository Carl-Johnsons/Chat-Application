using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Initial_Create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    User_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Phone_Number = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Password = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DOB = table.Column<DateTime>(type: "date", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    AvatarURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BackgroundURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Introduction = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__206D9190695FA223", x => x.User_ID);
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
                    table.PrimaryKey("PK_Friend", x => new { x.Friend_ID, x.User_ID });
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
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
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
                name: "Group",
                columns: table => new
                {
                    Group_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Group_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Group_Leader_ID = table.Column<int>(type: "int", nullable: false),
                    Group_Deputy_ID = table.Column<int>(type: "int", nullable: true),
                    Group_Avatar_URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Group_Invite_URL = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Group__31981269A04A40CE", x => x.Group_ID);
                    table.ForeignKey(
                        name: "FK_Group_User_Group_Deputy_ID",
                        column: x => x.Group_Deputy_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK_Group_User_Group_Leader_ID",
                        column: x => x.Group_Leader_ID,
                        principalTable: "User",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Message_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sender_ID = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<DateTime>(type: "datetime", nullable: false),
                    Message_Type = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Message_Format = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Message__F5A446E2317079D4", x => x.Message_ID);
                    table.ForeignKey(
                        name: "FK__Message__Sender___37A5467C",
                        column: x => x.Sender_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateTable(
                name: "UserBlock",
                columns: table => new
                {
                    User_ID = table.Column<int>(type: "int", nullable: false),
                    Blocked_User_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBlock", x => new { x.User_ID, x.Blocked_User_ID });
                    table.ForeignKey(
                        name: "FK__UserBlock__Block__2D27B809",
                        column: x => x.Blocked_User_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK__UserBlock__User___2C3393D0",
                        column: x => x.User_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateTable(
                name: "GroupBlock",
                columns: table => new
                {
                    Group_ID = table.Column<int>(type: "int", nullable: false),
                    Blocked_User_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupBlock", x => new { x.Group_ID, x.Blocked_User_ID });
                    table.ForeignKey(
                        name: "FK__GroupBloc__Block__33D4B598",
                        column: x => x.Blocked_User_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK__GroupBloc__Group__32E0915F",
                        column: x => x.Group_ID,
                        principalTable: "Group",
                        principalColumn: "Group_ID");
                });

            migrationBuilder.CreateTable(
                name: "GroupMessage",
                columns: table => new
                {
                    Message_ID = table.Column<int>(type: "int", nullable: false),
                    Group_Receiver_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMessage", x => new { x.Message_ID, x.Group_Receiver_ID });
                    table.ForeignKey(
                        name: "FK__GroupMess__Group__3D5E1FD2",
                        column: x => x.Group_Receiver_ID,
                        principalTable: "Group",
                        principalColumn: "Group_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__GroupMess__Messa__3C69FB99",
                        column: x => x.Message_ID,
                        principalTable: "Message",
                        principalColumn: "Message_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImageMessage",
                columns: table => new
                {
                    Message_ID = table.Column<int>(type: "int", nullable: false),
                    Image_URL = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageMessage", x => x.Message_ID);
                    table.ForeignKey(
                        name: "FK__ImageMess__Messa__3F466844",
                        column: x => x.Message_ID,
                        principalTable: "Message",
                        principalColumn: "Message_ID");
                });

            migrationBuilder.CreateTable(
                name: "IndividualMessage",
                columns: table => new
                {
                    Message_ID = table.Column<int>(type: "int", nullable: false),
                    User_Receiver_ID = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Read = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndividualMessage", x => x.Message_ID);
                    table.ForeignKey(
                        name: "FK__Individua__Messa__398D8EEE",
                        column: x => x.Message_ID,
                        principalTable: "Message",
                        principalColumn: "Message_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Individua__User___3A81B327",
                        column: x => x.User_Receiver_ID,
                        principalTable: "User",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friend_User_ID",
                table: "Friend",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequest_Receiver_ID",
                table: "FriendRequest",
                column: "Receiver_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Group_Group_Deputy_ID",
                table: "Group",
                column: "Group_Deputy_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Group_Group_Leader_ID",
                table: "Group",
                column: "Group_Leader_ID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupBlock_Blocked_User_ID",
                table: "GroupBlock",
                column: "Blocked_User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessage_Group_Receiver_ID",
                table: "GroupMessage",
                column: "Group_Receiver_ID");

            migrationBuilder.CreateIndex(
                name: "IX_IndividualMessage_User_Receiver_ID",
                table: "IndividualMessage",
                column: "User_Receiver_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Sender_ID",
                table: "Message",
                column: "Sender_ID");

            migrationBuilder.CreateIndex(
                name: "IX_UserBlock_Blocked_User_ID",
                table: "UserBlock",
                column: "Blocked_User_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friend");

            migrationBuilder.DropTable(
                name: "FriendRequest");

            migrationBuilder.DropTable(
                name: "GroupBlock");

            migrationBuilder.DropTable(
                name: "GroupMessage");

            migrationBuilder.DropTable(
                name: "ImageMessage");

            migrationBuilder.DropTable(
                name: "IndividualMessage");

            migrationBuilder.DropTable(
                name: "UserBlock");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
