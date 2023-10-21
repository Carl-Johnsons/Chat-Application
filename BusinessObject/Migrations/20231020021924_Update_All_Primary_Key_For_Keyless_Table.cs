using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Update_All_Primary_Key_For_Keyless_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserBlock_User_ID",
                table: "UserBlock");

            migrationBuilder.DropIndex(
                name: "IX_IndividualMessage_Message_ID",
                table: "IndividualMessage");

            migrationBuilder.DropIndex(
                name: "IX_ImageMessage_Message_ID",
                table: "ImageMessage");

            migrationBuilder.DropIndex(
                name: "IX_GroupMessage_Message_ID",
                table: "GroupMessage");

            migrationBuilder.DropIndex(
                name: "IX_GroupBlock_Group_ID",
                table: "GroupBlock");

            migrationBuilder.DropIndex(
                name: "IX_FriendRequest_Sender_ID",
                table: "FriendRequest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserBlock",
                table: "UserBlock",
                columns: new[] { "User_ID", "Blocked_User_ID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_IndividualMessage",
                table: "IndividualMessage",
                column: "Message_ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageMessage",
                table: "ImageMessage",
                column: "Message_ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupMessage",
                table: "GroupMessage",
                columns: new[] { "Message_ID", "Group_Receiver_ID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupBlock",
                table: "GroupBlock",
                columns: new[] { "Group_ID", "Blocked_User_ID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_FriendRequest",
                table: "FriendRequest",
                columns: new[] { "Sender_ID", "Receiver_ID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserBlock",
                table: "UserBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IndividualMessage",
                table: "IndividualMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageMessage",
                table: "ImageMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupMessage",
                table: "GroupMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupBlock",
                table: "GroupBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FriendRequest",
                table: "FriendRequest");

            migrationBuilder.CreateIndex(
                name: "IX_UserBlock_User_ID",
                table: "UserBlock",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_IndividualMessage_Message_ID",
                table: "IndividualMessage",
                column: "Message_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ImageMessage_Message_ID",
                table: "ImageMessage",
                column: "Message_ID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessage_Message_ID",
                table: "GroupMessage",
                column: "Message_ID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupBlock_Group_ID",
                table: "GroupBlock",
                column: "Group_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequest_Sender_ID",
                table: "FriendRequest",
                column: "Sender_ID");
        }
    }
}
