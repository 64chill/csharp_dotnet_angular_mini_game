using AutoMapper;
using Score.Dtos;
using Score.Models;

namespace Score.Profiles
{
    public class ScoreProfile : Profile
    {
        public ScoreProfile()
        {
            CreateMap<ScoreModel, ScoreReadDto>();
            CreateMap<ScoreCreateDto, ScoreModel>();
        }
    }
}