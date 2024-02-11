using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Remove_Group_Leader_And_Add_Role : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_User_Group_Leader_ID",
                table: "Group");

            migrationBuilder.DropIndex(
                name: "IX_Group_Group_Leader_ID",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "Group_Leader_ID",
                table: "Group");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "GroupUser",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "GroupUser");

            migrationBuilder.AddColumn<int>(
                name: "Group_Leader_ID",
                table: "Group",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Group_Group_Leader_ID",
                table: "Group",
                column: "Group_Leader_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_User_Group_Leader_ID",
                table: "Group",
                column: "Group_Leader_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
