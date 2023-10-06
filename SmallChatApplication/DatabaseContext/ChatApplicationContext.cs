﻿using SmallChatApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace SmallChatApplication.DatabaseContext
{
    public class ChatApplicationContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Messages> Messages { get; set; }

        public DbSet<Groups> Groups { get; set; }

        public DbSet<GroupMessages> GroupMessages { get; set; }
        public DbSet<IndividualMessages> IndividualMessages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=ChatApplication;Trusted_Connection=True");
        }


    }
}
