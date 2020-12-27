using Game.Models;
using Microsoft.EntityFrameworkCore;

namespace Game.Data
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> opt) : base(opt)
        {
            
        }
        public DbSet<GameModel> Games { get; set; }
        
    }
}