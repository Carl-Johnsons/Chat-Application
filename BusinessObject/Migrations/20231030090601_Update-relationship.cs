using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Updaterelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Group__Group_Dep__30F848ED",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK__Group__Group_Lea__300424B4",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_User_Group_Deputy_ID",
                table: "Group",
                column: "Group_Deputy_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_User_Group_Leader_ID",
                table: "Group",
                column: "Group_Leader_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock",
                column: "Group_ID",
                principalTable: "Group",
                principalColumn: "Group_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage",
                column: "Group_Receiver_ID",
                principalTable: "Group",
                principalColumn: "Group_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_User_Group_Deputy_ID",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK_Group_User_Group_Leader_ID",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage");

            migrationBuilder.AddForeignKey(
                name: "FK__Group__Group_Dep__30F848ED",
                table: "Group",
                column: "Group_Deputy_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__Group__Group_Lea__300424B4",
                table: "Group",
                column: "Group_Leader_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupBloc__Group__32E0915F",
                table: "GroupBlock",
                column: "Group_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage",
                column: "Group_Receiver_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
