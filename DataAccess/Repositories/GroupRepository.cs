﻿using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    internal class GroupRepository
    {
        private readonly ChatApplicationContext dbContext;

        public GroupRepository(ChatApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void CreateGroup(Group group)
        {
            dbContext.Groups.Add(group);
            dbContext.SaveChanges();
        }

        public Group GetGroupById(int groupId)
        {
            return dbContext.Groups.FirstOrDefault(g => g.GroupId == groupId);
        }

        public List<Group> GetAllGroups()
        {
            return dbContext.Groups.ToList();
        }

        public void UpdateGroup(Group group)
        {
            dbContext.Groups.Update(group);
            dbContext.SaveChanges();
        }

        public void DeleteGroup(int groupId)
        {
            Group groupToDelete = dbContext.Groups.FirstOrDefault(g => g.GroupId == groupId);
            if (groupToDelete != null)
            {
                dbContext.Groups.Remove(groupToDelete);
                dbContext.SaveChanges();
            }
        }
    }
}
