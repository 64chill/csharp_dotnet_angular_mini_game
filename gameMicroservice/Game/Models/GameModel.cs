using System.ComponentModel.DataAnnotations;

namespace Game.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Data { get; set; }
    }
}