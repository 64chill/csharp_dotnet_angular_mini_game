using System.ComponentModel.DataAnnotations.Schema;

namespace Score.Dtos
{
    public class ScoreCreateDto
    {
        public int Score { get; set; }
        public string Username { get; set; }
    }
}