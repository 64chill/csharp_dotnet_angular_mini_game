using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Score.Models
{
    public class ScoreModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Score { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}