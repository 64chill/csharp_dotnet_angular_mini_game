using System;
using System.Collections.Generic;
using System.Linq;
using Score.Models;

namespace Score.Data
{
    public class SqlScoreRepo : IScoreRepo
    {
        private readonly ScoreContext _context;

        public SqlScoreRepo(ScoreContext context)
        {
            _context = context;
        }
        public void CreateScore(ScoreModel score)
        {
            if (score==null){
                throw new ArgumentNullException(nameof(score));
            }
            _context.Score.Add(score);
        }

        public IEnumerable<ScoreModel> GetAllScores()
        {
            return _context.Score.OrderByDescending(o=>o.Score).ToList();
        }

        public ScoreModel GetScoreByUsername(string usrname)
        {
            return _context.Score.FirstOrDefault(p => p.Username == usrname);
        }

        public void RemoveScore(ScoreModel score)
        {
            _context.Score.Remove(score);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}