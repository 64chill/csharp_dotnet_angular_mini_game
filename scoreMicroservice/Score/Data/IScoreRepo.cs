using System.Collections.Generic;
using Score.Models;

namespace Score.Data
{
    public interface IScoreRepo
    {
        bool SaveChanges();
        IEnumerable<ScoreModel> GetAllScores();
        void CreateScore(ScoreModel score);
        void RemoveScore(ScoreModel score);

        ScoreModel GetScoreByUsername(string usrname);

    }
}