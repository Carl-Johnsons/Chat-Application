using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    public class GroupBlockDAO
    {
        private static GroupBlockDAO instance = null;
        private static readonly object instanceLock = new object();
        public static GroupBlockDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new GroupBlockDAO();
                    }
                    return instance;
                }

            }
        }
        public List<GroupBlock> GetAll()
        {
                using var context = new ChatApplicationContext();
                var groupBlocks = context.GroupBlocks.Include(gb => gb.Group).Include(gb => gb.BlockedUserId).ToList();
                return groupBlocks;
        }
        public GroupBlock GetGroupBlockByID(int GroupId) 
        {
            GroupBlock groupBlock = null;
            try
            {
                using var context = new ChatApplicationContext();
                groupBlock = context.GroupBlocks.SingleOrDefault(gb => gb.GroupId == GroupId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return groupBlock;
        
        }
        public void AddBlock(GroupBlock groupBlock)
        {

            try
            {
                GroupBlock _groupBlock = GetGroupBlockByID(groupBlock.GroupId);
                if( _groupBlock == null )
                {
                    using var context = new ChatApplicationContext();
                    context.GroupBlocks.Add(groupBlock);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group block is already exist.");
                }
                
            }catch (Exception ex)
            {
               throw new Exception (ex.Message);
            }
            
        }
        public void UpdateBlock(GroupBlock groupBlock)
        {

            try
            {
                GroupBlock _groupBlock = GetGroupBlockByID(groupBlock.GroupId);
                if (_groupBlock != null)
                {
                    using var context = new ChatApplicationContext();
                    context.GroupBlocks.Update(groupBlock);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group block does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public void DeleteBlock(int groupId)
        {

            try
            {
                GroupBlock _groupBlock = GetGroupBlockByID(groupId);
                if (_groupBlock != null)
                {
                    using var context = new ChatApplicationContext();
                    context.GroupBlocks.Remove(_groupBlock);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group block does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
