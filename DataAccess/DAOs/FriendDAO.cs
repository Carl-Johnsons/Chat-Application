using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.DAOs;

public class FriendDAO
{
    //using singleton to access db by one instance variable
    private static FriendDAO instance = null;
    private static readonly object instanceLock = new object();
    private FriendDAO() { }
    public static FriendDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                if (instance == null)
                {
                    instance = new FriendDAO();
                }
                return instance;
            }
        }
    }
    public int AddFriend(Friend friend)
    {
        using var context = new ChatApplicationContext();
        context.Friends.Add(friend);
        return context.SaveChanges();
    }

    public List<Friend> GetFriendsByUserId(int userId)
    {
        using var context = new ChatApplicationContext();
        return context.Friends
            .Where(f => f.UserId == userId || f.FriendId == userId)
            .Select(f => new Friend
            {
                FriendId = f.FriendId,
                UserId = f.UserId,
                FriendNavigation = f.UserId == userId ? f.FriendNavigation : f.User
            })
            .ToList();
    }

    public List<Friend> GetFriendsByFriendId(int friendId)
    {
        using var context = new ChatApplicationContext();
        return context.Friends
            .Where(f => f.UserId == friendId || f.FriendId == friendId)
            .Include(f => f.User)
            .ToList();
    }

    public int RemoveFriend(int userId, int friendId)
    {
        using var context = new ChatApplicationContext();
        Friend friendToRemove = context.Friends.FirstOrDefault(
            f =>
            (f.UserId == userId && f.FriendId == friendId)
            || (f.UserId == friendId && f.FriendId == userId)
            );
        if (friendToRemove != null)
        {
            context.Friends.Remove(friendToRemove);
            return context.SaveChanges();
        }
        return 0;
    }
}
