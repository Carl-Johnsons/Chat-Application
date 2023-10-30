using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

    public virtual DbSet<ImageMessage> ImageMessages { get; set; }

    public virtual DbSet<IndividualMessage> IndividualMessages { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserBlock> UserBlocks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=chatApplication;Trusted_Connection=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Friend>(entity =>
        {
            entity
                .ToTable("Friend");
            entity.HasKey(e => new { e.FriendId, e.UserId });
            entity.Property(e => e.FriendId).HasColumnName("Friend_ID");
            entity.Property(e => e.UserId).HasColumnName("User_ID");

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
            entity
                .ToTable("FriendRequest");
            entity.HasKey(e => new { e.SenderId, e.ReceiverId });
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.ReceiverId).HasColumnName("Receiver_ID");
            entity.Property(e => e.SenderId).HasColumnName("Sender_ID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Receiver).WithMany()
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Recei__2A4B4B5E");

            entity.HasOne(d => d.Sender).WithMany()
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Sende__29572725");
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.GroupId).HasName("PK__Group__31981269A04A40CE");

            entity.ToTable("Group");

            entity.Property(e => e.GroupId).HasColumnName("Group_ID");
            entity.Property(e => e.GroupAvatarUrl).HasColumnName("Group_Avatar_URL");
            entity.Property(e => e.GroupDeputyId).HasColumnName("Group_Deputy_ID");
            entity.Property(e => e.GroupInviteUrl).HasColumnName("Group_Invite_URL");
            entity.Property(e => e.GroupLeaderId).HasColumnName("Group_Leader_ID");
            entity.Property(e => e.GroupName)
                .HasMaxLength(50)
                .HasColumnName("Group_Name");

            entity.HasOne(d => d.GroupDeputy).WithMany(p => p.GroupGroupDeputies)
                .HasForeignKey(d => d.GroupDeputyId)
                .HasConstraintName("FK__Group__Group_Dep__30F848ED");

            entity.HasOne(d => d.GroupLeader).WithMany(p => p.GroupGroupLeaders)
                .HasForeignKey(d => d.GroupLeaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Group__Group_Lea__300424B4");
        });

        modelBuilder.Entity<GroupBlock>(entity =>
        {
            entity
                .ToTable("GroupBlock");
            entity.HasKey(e => new { e.GroupId, e.BlockedUserId });
            entity.Property(e => e.BlockedUserId).HasColumnName("Blocked_User_ID");
            entity.Property(e => e.GroupId).HasColumnName("Group_ID");

            entity.HasOne(d => d.BlockedUser).WithMany()
                .HasForeignKey(d => d.BlockedUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GroupBloc__Block__33D4B598");

            entity.HasOne(d => d.Group).WithMany()
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GroupBloc__Group__32E0915F");
        });

        modelBuilder.Entity<GroupMessage>(entity =>
        {
            entity
                .ToTable("GroupMessage");
            entity.HasKey(e => new { e.MessageId, e.GroupReceiverId });

            entity.Property(e => e.GroupReceiverId).HasColumnName("Group_Receiver_ID");
            entity.Property(e => e.MessageId).HasColumnName("Message_ID");

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
            entity
                .ToTable("ImageMessage");
            entity.HasKey(e => e.MessageId);

            entity.Property(e => e.ImageUrl).HasColumnName("Image_URL");
            entity.Property(e => e.MessageId).HasColumnName("Message_ID");

            entity.HasOne(d => d.Message).WithMany()
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ImageMess__Messa__3F466844");
        });

        modelBuilder.Entity<IndividualMessage>(entity =>
        {
            entity
                .ToTable("IndividualMessage");

            entity.HasKey(e => e.MessageId);
            entity.Property(e => e.MessageId).HasColumnName("Message_ID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserReceiverId).HasColumnName("User_Receiver_ID");

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
            entity.HasKey(e => e.MessageId).HasName("PK__Message__F5A446E2317079D4");

            entity.ToTable("Message");

            entity.Property(e => e.MessageId).HasColumnName("Message_ID");
            entity.Property(e => e.Active).HasDefaultValueSql("((1))");
            entity.Property(e => e.MessageFormat)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Message_Format");
            entity.Property(e => e.MessageType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Message_Type");
            entity.Property(e => e.SenderId).HasColumnName("Sender_ID");
            entity.Property(e => e.Time).HasColumnType("datetime");

            entity.HasOne(d => d.Sender).WithMany(p => p.Messages)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__Sender___37A5467C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__206D9190695FA223");

            entity.ToTable("User");

            entity.Property(e => e.UserId).HasColumnName("User_ID");
            entity.Property(e => e.Active).HasDefaultValueSql("((1))");
            entity.Property(e => e.AvatarUrl).HasColumnName("AvatarURL");
            entity.Property(e => e.BackgroundUrl).HasColumnName("BackgroundURL");
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(10);
            entity.Property(e => e.Introduction).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password)
                .HasMaxLength(32)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Phone_Number");
        });

        modelBuilder.Entity<UserBlock>(entity =>
        {
            entity
                .ToTable("UserBlock");

            entity.HasKey(e => new { e.UserId, e.BlockedUserId });
            entity.Property(e => e.BlockedUserId).HasColumnName("Blocked_User_ID");
            entity.Property(e => e.UserId).HasColumnName("User_ID");

            entity.HasOne(d => d.BlockedUser).WithMany()
                .HasForeignKey(d => d.BlockedUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserBlock__Block__2D27B809");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserBlock__User___2C3393D0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
