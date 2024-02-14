using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BussinessObject.Models;

public partial class ChatApplicationContext : DbContext
{
    public ChatApplicationContext()
    {
    }

    public ChatApplicationContext(DbContextOptions<ChatApplicationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Friend> Friends { get; set; }

    public virtual DbSet<FriendRequest> FriendRequests { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<GroupBlock> GroupBlocks { get; set; }

    public virtual DbSet<GroupMessage> GroupMessages { get; set; }

    public virtual DbSet<GroupUser> GroupUser { get; set; }

    public virtual DbSet<ImageMessage> ImageMessages { get; set; }

    public virtual DbSet<IndividualMessage> IndividualMessages { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserBlock> UserBlocks { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var defaultConnectionString = MyConfig.GetConnectionString("Default");
        optionsBuilder.UseSqlServer(defaultConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Friend>(entity =>
        {
            entity.HasOne(d => d.FriendNavigation).WithMany()
                .HasForeignKey(d => d.FriendId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Friend__Friend_I__276EDEB3");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Friend__User_ID__267ABA7A");
        });

        modelBuilder.Entity<FriendRequest>(entity =>
        {
            entity.HasOne(d => d.Receiver).WithMany()
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Recei__2A4B4B5E");

            entity.HasOne(d => d.Sender).WithMany()
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Sende__29572725");
        });
        modelBuilder.Entity<GroupBlock>(entity =>
        {
            entity.HasOne(d => d.BlockedUser).WithMany()
                .HasForeignKey(d => d.BlockedUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupBloc__Block__33D4B598");

            entity.HasOne(d => d.Group).WithMany()
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupBloc__Group__32E0915F");
        });
        modelBuilder.Entity<GroupMessage>(entity =>
        {
            entity.HasOne(d => d.GroupReceiver).WithMany()
                .HasForeignKey(d => d.GroupReceiverId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupMess__Group__3D5E1FD2");

            entity.HasOne(d => d.Message).WithMany()
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupMess__Messa__3C69FB99");
        });
        modelBuilder.Entity<ImageMessage>(entity =>
        {
            entity.HasOne(d => d.Message).WithMany()
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ImageMess__Messa__3F466844");
        });
        modelBuilder.Entity<IndividualMessage>(entity =>
        {
            entity.HasOne(d => d.Message).WithMany()
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Individua__Messa__398D8EEE");

            entity.HasOne(d => d.UserReceiver).WithMany()
                .HasForeignKey(d => d.UserReceiverId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Individua__User___3A81B327");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.HasOne(d => d.Sender).WithMany()
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__Sender___37A5467C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
        });
        modelBuilder.Entity<UserBlock>(entity =>
        {
            entity.HasOne(d => d.BlockedUser).WithMany()
                .HasForeignKey(d => d.BlockedUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserBlock__Block__2D27B809");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserBlock__User___2C3393D0");
        });

        modelBuilder.Entity<GroupUser>(entity =>
        {
            entity.HasOne(d => d.Group).WithMany()
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupUser__User");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GroupUser__Group");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
