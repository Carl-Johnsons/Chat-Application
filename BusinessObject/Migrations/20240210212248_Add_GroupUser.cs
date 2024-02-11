using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Add_GroupUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupUser",
                columns: table => new
                {
                    Group_ID = table.Column<int>(type: "int", nullable: false),
                    User_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser", x => new { x.Group_ID, x.User_ID });
                    table.ForeignKey(
                        name: "FK__GroupUser__Group",
                        column: x => x.User_ID,
                        principalTable: "User",
                        principalColumn: "User_ID");
                    table.ForeignKey(
                        name: "FK__GroupUser__User",
                        column: x => x.Group_ID,
                        principalTable: "Group",
                        principalColumn: "Group_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser_User_ID",
                table: "GroupUser",
                column: "User_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupUser");
        }
    }
}
