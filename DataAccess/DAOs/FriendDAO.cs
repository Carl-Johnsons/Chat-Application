using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs;

public class FriendDAO
{
    //using singleton to access db by one instance variable
    private static FriendDAO? instance = null;
    private static readonly object instanceLock = new();

    private FriendDAO() { }
    public static FriendDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new FriendDAO();
                return instance;
            }
        }
    }
    public int Add(Friend friend)
    {
        using var _context = new ChatApplicationContext();
        if (GetFriendsByUserIdOrFriendId(friend.UserId, friend.UserId) != null)
        {
            throw new Exception("They are already friend! Aborting add friend operation");
        }
        _context.Friends.Add(friend);
        return _context.SaveChanges();
    }
    public List<Friend> GetByUserId(int userId)
    {
        using var _context = new ChatApplicationContext();
        MessageRepository messageRepository = new();
        return _context.Friends
            .Where(f => f.UserId == userId || f.FriendId == userId)
            .Select(f => new Friend
            {
                FriendId = f.FriendId,
                UserId = f.UserId,
                FriendNavigation = f.UserId == userId ? f.FriendNavigation : f.User
            })
            .AsEnumerable() // Convert into client-side to handle sorting
            .OrderByDescending(f =>
            {
                return messageRepository.GetLastIndividualMessage(f.UserId, f.FriendId)?.Message?.Time ?? DateTime.MinValue;
            })
            .ToList();
    }
    public List<Friend> GetByFriendId(int friendId)
    {
        using var _context = new ChatApplicationContext();
        return _context.Friends
            .Where(f => f.UserId == friendId || f.FriendId == friendId)
            .Include(f => f.User)
            .ToList();
    }
    public Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId)
    {
        using var _context = new ChatApplicationContext();
        return _context.Friends.FirstOrDefault(
            f =>
            (f.UserId == userId && f.FriendId == friendId)
            || (f.UserId == friendId && f.FriendId == userId)
            );
    }
    public int Delete(int userId, int friendId)
    {
        using var _context = new ChatApplicationContext();
        Friend? friendToRemove = GetFriendsByUserIdOrFriendId(userId, friendId) ?? throw new Exception("Friend not found! Aborting delete operation");
        _context.Friends.Remove(friendToRemove);
        return _context.SaveChanges();
    }
}
