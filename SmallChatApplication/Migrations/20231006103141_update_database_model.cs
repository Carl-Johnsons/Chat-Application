using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmallChatApplication.Migrations
{
    /// <inheritdoc />
    public partial class update_database_model : Migration
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
                name: "UsersUserID",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderUserUserID",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UsersUserID",
                table: "Users",
                column: "UsersUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderUserUserID",
                table: "Messages",
                column: "SenderUserUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_SenderUserUserID",
                table: "Messages",
                column: "SenderUserUserID",
                principalTable: "Users",
                principalColumn: "UserID");

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
                name: "FK_Users_Users_UsersUserID",
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
