using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInheritance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupConversation");

            migrationBuilder.DropTable(
                name: "IndividualConversation");

            migrationBuilder.AddColumn<string>(
                name: "Image_URL",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Invite_URL",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Conversation",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "GroupConversation",
                columns: table => new
                {
                    ConverastionId = table.Column<int>(type: "int", nullable: false),
                    Image_URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Invite_URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
    }
}
