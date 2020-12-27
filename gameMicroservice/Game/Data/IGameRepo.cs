using System.Collections.Generic;
using Game.Models;

namespace Game.Data
{
    public interface IGameRepo
    {
        bool SaveChanges();
        GameModel GetRandomGame();

        GameModel GetGameById(int id);
        void CreateGame(GameModel gm);
        void UpdateGame(GameModel gm);

        void DeleteGame(GameModel gm);
        IEnumerable<GameModel> GetAllGames();

    }
}