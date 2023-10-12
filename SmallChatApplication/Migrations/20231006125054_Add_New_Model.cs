using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmallChatApplication.Migrations
{
    /// <inheritdoc />
    public partial class Add_New_Model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_SenderUserID",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_SenderUserID",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "SenderUserID",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "AvatarURL",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GroupsGroupID",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsersUserID",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderUserUserID",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    GroupID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvatarURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupOwnerUserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.GroupID);
                    table.ForeignKey(
                        name: "FK_Groups_Users_GroupOwnerUserID",
                        column: x => x.GroupOwnerUserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "IndividualMessages",
                columns: table => new
                {
                    MessageID = table.Column<int>(type: "int", nullable: true),
                    ReceiverUserUserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_IndividualMessages_Messages_MessageID",
                        column: x => x.MessageID,
                        principalTable: "Messages",
                        principalColumn: "MessageID");
                    table.ForeignKey(
                        name: "FK_IndividualMessages_Users_ReceiverUserUserID",
                        column: x => x.ReceiverUserUserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "GroupMessages",
                columns: table => new
                {
                    MessageID = table.Column<int>(type: "int", nullable: true),
                    GroupID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_GroupMessages_Groups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "Groups",
                        principalColumn: "GroupID");
                    table.ForeignKey(
                        name: "FK_GroupMessages_Messages_MessageID",
                        column: x => x.MessageID,
                        principalTable: "Messages",
                        principalColumn: "MessageID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_GroupsGroupID",
                table: "Users",
                column: "GroupsGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UsersUserID",
                table: "Users",
                column: "UsersUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderUserUserID",
                table: "Messages",
                column: "SenderUserUserID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessages_GroupID",
                table: "GroupMessages",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessages_MessageID",
                table: "GroupMessages",
                column: "MessageID");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_GroupOwnerUserID",
                table: "Groups",
                column: "GroupOwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_IndividualMessages_MessageID",
                table: "IndividualMessages",
                column: "MessageID");

            migrationBuilder.CreateIndex(
                name: "IX_IndividualMessages_ReceiverUserUserID",
                table: "IndividualMessages",
                column: "ReceiverUserUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_SenderUserUserID",
                table: "Messages",
                column: "SenderUserUserID",
                principalTable: "Users",
                principalColumn: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Groups_GroupsGroupID",
                table: "Users",
                column: "GroupsGroupID",
                principalTable: "Groups",
                principalColumn: "GroupID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_UsersUserID",
                table: "Users",
                column: "UsersUserID",
                principalTable: "Users",
                principalColumn: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_SenderUserUserID",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Groups_GroupsGroupID",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_UsersUserID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "GroupMessages");

            migrationBuilder.DropTable(
                name: "IndividualMessages");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Users_GroupsGroupID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UsersUserID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Messages_SenderUserUserID",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AvatarURL",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "GroupsGroupID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UsersUserID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SenderUserUserID",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "SenderUserID",
                table: "Messages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderUserID",
                table: "Messages",
                column: "SenderUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_SenderUserID",
                table: "Messages",
                column: "SenderUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
