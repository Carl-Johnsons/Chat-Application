using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class Update_DeleteBehaviourCasadeForMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Messa__3C69FB99",
                table: "GroupMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__Individua__Messa__398D8EEE",
                table: "IndividualMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__Individua__User___3A81B327",
                table: "IndividualMessage");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage",
                column: "Group_Receiver_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Messa__3C69FB99",
                table: "GroupMessage",
                column: "Message_ID",
                principalTable: "Message",
                principalColumn: "Message_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Individua__Messa__398D8EEE",
                table: "IndividualMessage",
                column: "Message_ID",
                principalTable: "Message",
                principalColumn: "Message_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Individua__User___3A81B327",
                table: "IndividualMessage",
                column: "User_Receiver_ID",
                principalTable: "User",
                principalColumn: "User_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__GroupMess__Messa__3C69FB99",
                table: "GroupMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__Individua__Messa__398D8EEE",
                table: "IndividualMessage");

            migrationBuilder.DropForeignKey(
                name: "FK__Individua__User___3A81B327",
                table: "IndividualMessage");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Group__3D5E1FD2",
                table: "GroupMessage",
                column: "Group_Receiver_ID",
                principalTable: "User",
                principalColumn: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__GroupMess__Messa__3C69FB99",
                table: "GroupMessage",
                column: "Message_ID",
                principalTable: "Message",
                principalColumn: "Message_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__Individua__Messa__398D8EEE",
                table: "IndividualMessage",
                column: "Message_ID",
                principalTable: "Message",
                principalColumn: "Message_ID");

            migrationBuilder.AddForeignKey(
                name: "FK__Individua__User___3A81B327",
                table: "IndividualMessage",
                column: "User_Receiver_ID",
                principalTable: "User",
                principalColumn: "User_ID");
        }
    }
}
