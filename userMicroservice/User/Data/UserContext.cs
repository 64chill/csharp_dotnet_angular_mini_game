using Microsoft.EntityFrameworkCore;
using User.Models;

namespace User.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> opt) : base(opt)
        {
            
        }
        public DbSet<UserModel> Users { get; set; }
        
    }
}