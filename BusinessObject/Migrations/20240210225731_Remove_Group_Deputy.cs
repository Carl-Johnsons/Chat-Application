using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Remove_Group_Deputy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_User_Group_Deputy_ID",
                table: "Group");

            migrationBuilder.DropIndex(
                name: "IX_Group_Group_Deputy_ID",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "Group_Deputy_ID",
                table: "Group");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Group_Deputy_ID",
                table: "Group",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Group_Group_Deputy_ID",
                table: "Group",
                column: "Group_Deputy_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_User_Group_Deputy_ID",
                table: "Group",
                column: "Group_Deputy_ID",
                principalTable: "User",
                principalColumn: "User_ID");
        }
    }
}
