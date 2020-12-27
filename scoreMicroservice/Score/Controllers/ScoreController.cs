using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Score.Data;
using Score.Dtos;
using Score.Models;

namespace Score.Controllers
{
    [Route("api/score")]
    [ApiController]
    public class ScoreControler : ControllerBase
    {
        private readonly IScoreRepo _repository;
        private  readonly IMapper _mapper;

        //ctor shortcut
        public ScoreControler(IScoreRepo repository, IMapper mapper)
        {
            _repository = repository;            
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<IEnumerable<ScoreReadDto>> GetAllScores()
        {
            var scoreItems = _repository.GetAllScores();
            return Ok(_mapper.Map<IEnumerable<ScoreReadDto>>(scoreItems));
        }

        [HttpPost]
        public ActionResult <ScoreReadDto> CreateScore(ScoreCreateDto scoreCreateDto)
        {
            var scoreItem = _repository.GetScoreByUsername(scoreCreateDto.Username);
            
            if(scoreItem != null){ // If there is record in DB
            scoreItem.Score = scoreCreateDto.Score;
            
            } else{
             var scoreModel = _mapper.Map<ScoreModel>(scoreCreateDto);
            _repository.CreateScore(scoreModel);
            }
            _repository.SaveChanges();
            return Ok(); 
        }

    }
}