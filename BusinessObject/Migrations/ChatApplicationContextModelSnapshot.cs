﻿// <auto-generated />
using System;
using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BussinessObject.Migrations
{
    [DbContext(typeof(ChatApplicationContext))]
    partial class ChatApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BussinessObject.Models.Friend", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("User_ID");

                    b.Property<int>("FriendId")
                        .HasColumnType("int")
                        .HasColumnName("Friend_ID");

                    b.HasKey("UserId", "FriendId");

                    b.HasIndex("FriendId");

                    b.ToTable("Friend");
                });

            modelBuilder.Entity("BussinessObject.Models.FriendRequest", b =>
                {
                    b.Property<int>("SenderId")
                        .HasColumnType("int")
                        .HasColumnName("Sender_ID");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("int")
                        .HasColumnName("Receiver_ID");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Status");

                    b.HasKey("SenderId", "ReceiverId");

                    b.HasIndex("ReceiverId");

                    b.ToTable("FriendRequest");
                });

            modelBuilder.Entity("BussinessObject.Models.Group", b =>
                {
                    b.Property<int>("GroupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Group_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GroupId"));

                    b.Property<string>("GroupAvatarUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Group_Avatar_URL");

                    b.Property<string>("GroupInviteUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Group_Invite_URL");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Group_Name");

                    b.HasKey("GroupId");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupBlock", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnType("int")
                        .HasColumnName("Group_ID");

                    b.Property<int>("BlockedUserId")
                        .HasColumnType("int")
                        .HasColumnName("Blocked_User_ID");

                    b.HasKey("GroupId", "BlockedUserId");

                    b.HasIndex("BlockedUserId");

                    b.ToTable("GroupBlock");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupMessage", b =>
                {
                    b.Property<int>("MessageId")
                        .HasColumnType("int")
                        .HasColumnName("Message_ID");

                    b.Property<int>("GroupReceiverId")
                        .HasColumnType("int")
                        .HasColumnName("Group_Receiver_ID");

                    b.HasKey("MessageId", "GroupReceiverId");

                    b.HasIndex("GroupReceiverId");

                    b.ToTable("GroupMessage");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupUser", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnType("int")
                        .HasColumnName("Group_ID");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("User_ID");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Role");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("BussinessObject.Models.ImageMessage", b =>
                {
                    b.Property<int>("MessageId")
                        .HasColumnType("int")
                        .HasColumnName("Message_ID");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Image_URL");

                    b.HasKey("MessageId");

                    b.ToTable("ImageMessage");
                });

            modelBuilder.Entity("BussinessObject.Models.IndividualMessage", b =>
                {
                    b.Property<int>("MessageId")
                        .HasColumnType("int")
                        .HasColumnName("Message_ID");

                    b.Property<bool>("Read")
                        .HasColumnType("bit");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Status");

                    b.Property<int>("UserReceiverId")
                        .HasColumnType("int")
                        .HasColumnName("User_Receiver_ID");

                    b.HasKey("MessageId");

                    b.HasIndex("UserReceiverId");

                    b.ToTable("IndividualMessage");
                });

            modelBuilder.Entity("BussinessObject.Models.Message", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Message_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MessageId"));

                    b.Property<bool?>("Active")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("Active");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MessageFormat")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Message_Format");

                    b.Property<string>("MessageType")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Message_Type");

                    b.Property<int>("SenderId")
                        .HasColumnType("int")
                        .HasColumnName("Sender_ID");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2")
                        .HasColumnName("Time");

                    b.HasKey("MessageId");

                    b.HasIndex("SenderId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("BussinessObject.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("User_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<bool?>("Active")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<string>("AvatarUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AvatarURL");

                    b.Property<string>("BackgroundUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("BackgroundURL");

                    b.Property<DateTime>("Dob")
                        .HasColumnType("datetime2")
                        .HasColumnName("DOB");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Email");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Introduction")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)")
                        .HasColumnName("Password");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("Phone_Number");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RefreshTokenCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("RefreshTokenExpired")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("BussinessObject.Models.UserBlock", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("User_ID");

                    b.Property<int>("BlockedUserId")
                        .HasColumnType("int")
                        .HasColumnName("Blocked_User_ID");

                    b.HasKey("UserId", "BlockedUserId");

                    b.HasIndex("BlockedUserId");

                    b.ToTable("UserBlock");
                });

            modelBuilder.Entity("BussinessObject.Models.Friend", b =>
                {
                    b.HasOne("BussinessObject.Models.User", "FriendNavigation")
                        .WithMany()
                        .HasForeignKey("FriendId")
                        .IsRequired()
                        .HasConstraintName("FK__Friend__Friend_I__276EDEB3");

                    b.HasOne("BussinessObject.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK__Friend__User_ID__267ABA7A");

                    b.Navigation("FriendNavigation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BussinessObject.Models.FriendRequest", b =>
                {
                    b.HasOne("BussinessObject.Models.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId")
                        .IsRequired()
                        .HasConstraintName("FK__FriendReq__Recei__2A4B4B5E");

                    b.HasOne("BussinessObject.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .IsRequired()
                        .HasConstraintName("FK__FriendReq__Sende__29572725");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupBlock", b =>
                {
                    b.HasOne("BussinessObject.Models.User", "BlockedUser")
                        .WithMany()
                        .HasForeignKey("BlockedUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupBloc__Block__33D4B598");

                    b.HasOne("BussinessObject.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupBloc__Group__32E0915F");

                    b.Navigation("BlockedUser");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupMessage", b =>
                {
                    b.HasOne("BussinessObject.Models.Group", "GroupReceiver")
                        .WithMany()
                        .HasForeignKey("GroupReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupMess__Group__3D5E1FD2");

                    b.HasOne("BussinessObject.Models.Message", "Message")
                        .WithMany()
                        .HasForeignKey("MessageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupMess__Messa__3C69FB99");

                    b.Navigation("GroupReceiver");

                    b.Navigation("Message");
                });

            modelBuilder.Entity("BussinessObject.Models.GroupUser", b =>
                {
                    b.HasOne("BussinessObject.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupUser__User");

                    b.HasOne("BussinessObject.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__GroupUser__Group");

                    b.Navigation("Group");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BussinessObject.Models.ImageMessage", b =>
                {
                    b.HasOne("BussinessObject.Models.Message", "Message")
                        .WithMany()
                        .HasForeignKey("MessageId")
                        .IsRequired()
                        .HasConstraintName("FK__ImageMess__Messa__3F466844");

                    b.Navigation("Message");
                });

            modelBuilder.Entity("BussinessObject.Models.IndividualMessage", b =>
                {
                    b.HasOne("BussinessObject.Models.Message", "Message")
                        .WithMany()
                        .HasForeignKey("MessageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__Individua__Messa__398D8EEE");

                    b.HasOne("BussinessObject.Models.User", "UserReceiver")
                        .WithMany()
                        .HasForeignKey("UserReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__Individua__User___3A81B327");

                    b.Navigation("Message");

                    b.Navigation("UserReceiver");
                });

            modelBuilder.Entity("BussinessObject.Models.Message", b =>
                {
                    b.HasOne("BussinessObject.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .IsRequired()
                        .HasConstraintName("FK__Message__Sender___37A5467C");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("BussinessObject.Models.UserBlock", b =>
                {
                    b.HasOne("BussinessObject.Models.User", "BlockedUser")
                        .WithMany()
                        .HasForeignKey("BlockedUserId")
                        .IsRequired()
                        .HasConstraintName("FK__UserBlock__Block__2D27B809");

                    b.HasOne("BussinessObject.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK__UserBlock__User___2C3393D0");

                    b.Navigation("BlockedUser");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
