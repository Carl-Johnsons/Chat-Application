using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class SetDeleteCasade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Block__33D4B598",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupUser__Group",
                table: "GroupUser");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupUser__User",
                table: "GroupUser");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Block__33D4B598",
                table: "GroupBlock",
                column: "Blocked_User_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock",
                column: "Group_ID",
                principalTable: "Group",
                principalColumn: "Group_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__GroupUser__Group",
                table: "GroupUser",
                column: "User_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__GroupUser__User",
                table: "GroupUser",
                column: "Group_ID",
                principalTable: "Group",
                principalColumn: "Group_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Block__33D4B598",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupUser__Group",
                table: "GroupUser");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupUser__User",
                table: "GroupUser");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Block__33D4B598",
                table: "GroupBlock",
                column: "Blocked_User_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock",
                column: "Group_ID",
                principalTable: "Group",
                principalColumn: "Group_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupUser__Group",
                table: "GroupUser",
                column: "User_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupUser__User",
                table: "GroupUser",
                column: "Group_ID",
                principalTable: "Group",
                principalColumn: "Group_ID");
        }
    }
}
