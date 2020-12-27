using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using User.Data;
using User.Dtos;
using User.Models;

namespace User.Controllers
{
    public class UserRequestLoginModel{
        public string username { get; set; }
        public string password { get; set; }
    }
    [Route("api/users")]
    [ApiController]
    public class UsersControler : ControllerBase
    {
        private readonly IUserRepo _repository;
        private  readonly IMapper _mapper;

        public UsersControler(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;            
            _mapper = mapper;
        }
        [HttpPost("/login")] 
        public ActionResult<UserReadDto> GetUserByUsernameAndPassword(UserRequestLoginModel inputData)
        {
            var username = inputData.username;
            var pwd = inputData.password;
            var usrItem = _repository.GetUserByUsernameAndPassword(username, pwd);
            if(usrItem != null){
 
                return Ok(_mapper.Map<UserReadDto>(usrItem));
            }
            return NotFound();
        }
        [HttpPost("/create")]
        public ActionResult <UserReadDto> CreateCommand(UserCreateDto usrCreateDto)
        {
            var usrModel = _mapper.Map<UserModel>(usrCreateDto);
            var usrItem = _repository.doesUsernameExist(usrModel.Username);
            if(usrItem == null)
            {
                _repository.CreateUser(usrModel);
                _repository.SaveChanges();
                var usrReadDto = _mapper.Map<UserReadDto>(usrModel);
                return Ok(usrReadDto); 
            }
            return Ok("USER_EXIST");
        }


    }
}