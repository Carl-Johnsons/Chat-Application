using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConversationService.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AllowNullAttachFileUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AttachedFilesURL",
                table: "Message", // replace with your actual table name
                type: "nvarchar(max)",
                nullable: true, // this allows null values
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: false); // this was the previous state (not null)
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AttachedFilesURL",
                table: "Message", // replace with your actual table name
                type: "nvarchar(max)",
                nullable: false, // this disallows null values (rollback)
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true); // this was the previous state (nullable)
        }
    }
}
