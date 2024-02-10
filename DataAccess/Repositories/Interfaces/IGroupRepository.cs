using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        public int Add(Group group);
        public List<Group> Get();
        public Group? GetById(int groupId);
        public int Update(Group group);
        public int Delete(int groupId);
    }
}
