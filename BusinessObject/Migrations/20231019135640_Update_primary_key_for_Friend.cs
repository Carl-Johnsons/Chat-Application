using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Update_primary_key_for_Friend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Friend_Friend_ID",
                table: "Friend");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friend",
                table: "Friend",
                columns: new[] { "Friend_ID", "User_ID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Friend",
                table: "Friend");

            migrationBuilder.CreateIndex(
                name: "IX_Friend_Friend_ID",
                table: "Friend",
                column: "Friend_ID");
        }
    }
}
