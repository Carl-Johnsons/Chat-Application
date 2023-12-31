﻿using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        public User GetUserByID(int userId) => UserDAO.Instance.GetUserByID(userId);
        public List<User> GetUserList() => UserDAO.Instance.GetUserList();
        public User? GetUserByPhoneNumber(string? phoneNumber) => UserDAO.Instance.GetUserByPhoneNumber(phoneNumber);
        public User? Login(string? phoneNumber, string? password) => UserDAO.Instance.Login(phoneNumber, password);
        public int InsertUser(User user) => UserDAO.Instance.AddUser(user);
        public int DeleteUser(int userId) => UserDAO.Instance.RemoveUser(userId);
        public int UpdateUser(User userUpdate) => UserDAO.Instance.UpdateUser(userUpdate);

    }
}
