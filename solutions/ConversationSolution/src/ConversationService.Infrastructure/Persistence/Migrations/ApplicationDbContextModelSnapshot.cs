﻿// <auto-generated />
using System;
using ConversationService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ConversationService.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ConversationService.Core.Entities.Conversation", b =>
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
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.ToTable("Conversation");

                    b.HasDiscriminator<string>("Type").HasValue("Individual");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("ConversationService.Core.Entities.ConversationUser", b =>
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

                    b.ToTable("ConversationUser");
                });

            modelBuilder.Entity("ConversationService.Core.Entities.Friend", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("User_Id");

                    b.Property<int>("FriendId")
                        .HasColumnType("int")
                        .HasColumnName("Friend_Id");

                    b.HasKey("UserId", "FriendId");

                    b.ToTable("Friend");
                });

            modelBuilder.Entity("ConversationService.Core.Entities.FriendRequest", b =>
                {
                    b.Property<int>("SenderId")
                        .HasColumnType("int")
                        .HasColumnName("Sender_Id");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("int")
                        .HasColumnName("Receiver_Id");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Status");

                    b.HasKey("SenderId", "ReceiverId");

                    b.ToTable("FriendRequest");
                });

            modelBuilder.Entity("ConversationService.Core.Entities.Message", b =>
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

                    b.Property<string>("AttachedFilesURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Attached_Files_URL");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConversationId")
                        .HasColumnType("int")
                        .HasColumnName("Conversation_Id");

                    b.Property<int?>("SenderId")
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

                    b.ToTable("Message");
                });

            modelBuilder.Entity("ConversationService.Core.Entities.GroupConversation", b =>
                {
                    b.HasBaseType("ConversationService.Core.Entities.Conversation");

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

            modelBuilder.Entity("ConversationService.Core.Entities.ConversationUser", b =>
                {
                    b.HasOne("ConversationService.Core.Entities.Conversation", "Conversation")
                        .WithMany()
                        .HasForeignKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conversation");
                });

            modelBuilder.Entity("ConversationService.Core.Entities.Message", b =>
                {
                    b.HasOne("ConversationService.Core.Entities.Conversation", "Conversation")
                        .WithMany()
                        .HasForeignKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conversation");
                });
#pragma warning restore 612, 618
        }
    }
}
