﻿// <auto-generated />
using System;
using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BussinessObject.Migrations
{
    [DbContext(typeof(ChatApplicationContext))]
    [Migration("20240317143025_Update-Inheritance")]
    partial class UpdateInheritance
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BussinessObject.Models.Conversation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("Created_At");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Conversation");

                    b.HasDiscriminator<string>("Type").HasValue("Individual");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("BussinessObject.Models.ConversationUser", b =>
                {
                    b.Property<int>("ConversationId")
                        .HasColumnType("int")
                        .HasColumnName("Conversation_Id");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("User_Id");

                    b.Property<DateTime?>("ReadTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ConversationId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("ConversationUser");
                });

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

            modelBuilder.Entity("BussinessObject.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("Active")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("Active");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConversationId")
                        .HasColumnType("int")
                        .HasColumnName("Conversation_Id");

                    b.Property<string>("Format")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Format");

                    b.Property<int?>("SenderId")
                        .IsRequired()
                        .HasColumnType("int")
                        .HasColumnName("Sender_Id");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Source");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2")
                        .HasColumnName("Time");

                    b.HasKey("Id");

                    b.HasIndex("ConversationId");

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

            modelBuilder.Entity("BussinessObject.Models.GroupConversation", b =>
                {
                    b.HasBaseType("BussinessObject.Models.Conversation");

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Image_URL");

                    b.Property<string>("InviteURL")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Invite_URL");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.ToTable("Conversation");

                    b.HasDiscriminator().HasValue("Group");
                });

            modelBuilder.Entity("BussinessObject.Models.ConversationUser", b =>
                {
                    b.HasOne("BussinessObject.Models.Conversation", "Conversation")
                        .WithMany()
                        .HasForeignKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__ConversationUser__Conversation");

                    b.HasOne("BussinessObject.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__ConversationUser__User");

                    b.Navigation("Conversation");

                    b.Navigation("User");
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

            modelBuilder.Entity("BussinessObject.Models.Message", b =>
                {
                    b.HasOne("BussinessObject.Models.Conversation", "Conversation")
                        .WithMany()
                        .HasForeignKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BussinessObject.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .IsRequired()
                        .HasConstraintName("FK__Message__Sender___37A5467C");

                    b.Navigation("Conversation");

                    b.Navigation("Sender");
                });
#pragma warning restore 612, 618
        }
    }
}
