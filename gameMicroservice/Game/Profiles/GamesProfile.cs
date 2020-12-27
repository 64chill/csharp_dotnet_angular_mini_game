using AutoMapper;
using Game.Dtos;
using Game.Models;

namespace Commander.Profiles
{
    public class CommandsProfile : Profile
    {
        public CommandsProfile()
        {
            // mapping source -> target / destination
            CreateMap<GameModel, GameReadDto>();
            CreateMap<GameCreateDto, GameModel>();
            CreateMap<GameUpdateDto, GameModel>();
        }
    }
}