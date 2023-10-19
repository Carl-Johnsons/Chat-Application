using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.DAOs;

internal class FriendDAO
{
    private readonly ChatApplicationContext dbContext; // Replace 'ChatApplicationContext'

    public FriendDAO(ChatApplicationContext dbContext) // Replace 'ChatApplicationContext'
    {
        this.dbContext = dbContext;
    }

    public void AddFriend(Friend friend)
    {
        dbContext.Friends.Add(friend);
        dbContext.SaveChanges();
    }

    public List<Friend> GetFriendsByUserId(int userId)
    {
        return dbContext.Friends.Where(f => f.UserId == userId).ToList();
    }

    public List<Friend> GetFriendsByFriendId(int friendId)
    {
        return dbContext.Friends.Where(f => f.FriendId == friendId).ToList();
    }

    public void RemoveFriend(int userId, int friendId)
    {
        Friend friendToRemove = dbContext.Friends.FirstOrDefault(f => f.UserId == userId && f.FriendId == friendId);
        if (friendToRemove != null)
        {
            dbContext.Friends.Remove(friendToRemove);
            dbContext.SaveChanges();
        }
    }
}
