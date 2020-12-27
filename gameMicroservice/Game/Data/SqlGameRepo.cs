using System;
using System.Collections.Generic;
using System.Linq;
using Game.Models;

namespace Game.Data
{
    public class SqlGameRepo : IGameRepo
    {
        private readonly GameContext _context;

        public SqlGameRepo(GameContext context)
        {
            _context = context;
        }
        public void CreateGame(GameModel gm)
        {
            if (gm==null){
                throw new ArgumentNullException(nameof(gm));
            }
            _context.Games.Add(gm); // do SQL insert 
        }

        public GameModel GetRandomGame()
        {
            return _context.Games.OrderBy(c => Guid.NewGuid()).FirstOrDefault();
            // get random element from our data,
            // sort with GUID which will always return the data list in a different order
        }

        public bool SaveChanges()
        {
            // we need it to save the changes that we will do to our DB
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateGame(GameModel gm) //TODO
        {
            //set as empty as "placeholder" in case it is needed in the future
            // for now our mapper takes care of updating the certain game!
            throw new NotImplementedException();
        }
        public void DeleteGame(GameModel gm)
        {
            if(gm == null){
                throw new ArgumentNullException(nameof(gm));
            }
            _context.Remove(gm);
        }

        public IEnumerable<GameModel> GetAllGames() 
        {
            return _context.Games.ToList();
        }

        public GameModel GetGameById(int id) 
        {
            return _context.Games.FirstOrDefault(p => p.Id == id);
        }
    }
}