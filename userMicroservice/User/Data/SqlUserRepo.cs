using System;
using System.Linq;
using User.Models;

namespace User.Data
{
    public class SqlUserRepo : IUserRepo
    {
        private readonly UserContext _context;

        public SqlUserRepo(UserContext context)
        {
            _context = context;
        }

        public void CreateUser(UserModel usr)
        {
            if (usr==null){
                throw new ArgumentNullException(nameof(usr));
            }
            _context.Users.Add(usr);
        }

        public UserModel GetUserByUsernameAndPassword(string usr, string pwd)
        {
            return _context.Users.FirstOrDefault(p => p.Username == usr && p.Password == pwd );
        }

        public UserModel doesUsernameExist(string usr)
        {
            return _context.Users.FirstOrDefault(p => p.Username == usr );
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}