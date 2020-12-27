using Score.Models;
using Microsoft.EntityFrameworkCore;

namespace Score.Data
{
    public class ScoreContext : DbContext
    {
        public ScoreContext(DbContextOptions<ScoreContext> opt) : base(opt)
        {
            
        }
        public DbSet<ScoreModel> Score { get; set; }
    }
}