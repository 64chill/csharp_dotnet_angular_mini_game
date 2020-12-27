using AutoMapper;
using Game.Data;
using Game.Dtos;
using Game.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Game.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GamesControler : ControllerBase
    {
        private readonly IGameRepo _repository;
        private  readonly IMapper _mapper;

       
        public GamesControler(IGameRepo repository, IMapper mapper)
        {
            _repository = repository;            
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<GameReadDto> GetRandomGame() //
        {
            var gameItem = _repository.GetRandomGame();
            if(gameItem != null){ 
                // if game exists send OK - 200 status
                return Ok(_mapper.Map<GameReadDto>(gameItem));
            }
            // if gameItem ==null >> no game in our database!
            return NotFound();
        }

        [HttpPost]
        public ActionResult <GameReadDto> CreateGame(GameCreateDto gameCreateDto)
        {
            var gameModel = _mapper.Map<GameModel>(gameCreateDto);
            _repository.CreateGame(gameModel);
            _repository.SaveChanges();
            var gameReadDto = _mapper.Map<GameReadDto>(gameModel);
            return Ok(gameReadDto); // returns inserted data
        }

        [HttpPut]
        public ActionResult UpdateGame(GameUpdateDto gameUpdateDto)
        {
            var gameModelFromRepo = _repository.GetGameById(gameUpdateDto.Id);
            if(gameModelFromRepo == null){ return NotFound();}

            _mapper.Map(gameUpdateDto, gameModelFromRepo);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGame(int id){
            var gameModelFromRepo = _repository.GetGameById(id);
            if(gameModelFromRepo == null){ return NotFound();}

            _repository.DeleteGame(gameModelFromRepo);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<GameReadDto>> GetAllGames()
        {
            var scoreItems = _repository.GetAllGames();
            return Ok(_mapper.Map<IEnumerable<GameReadDto>>(scoreItems));
        }

    }
}