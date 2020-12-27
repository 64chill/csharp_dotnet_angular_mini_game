using AutoMapper;
using User.Dtos;
using User.Models;

namespace User.Profiles
{
    public class CommandsProfile : Profile
    {
        public CommandsProfile()
        {
            // mapping source -> target / destination
            CreateMap<UserModel, UserReadDto>();
            CreateMap<UserCreateDto, UserModel>();
        }
    }
}