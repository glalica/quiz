//Es el controlador de los quizes

var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question',{pregunta: quiz[0].pregunta})
  })
};

//GET /quizes/answer
exports.answer = function(req, res){
  //console.log("req.query.respuesta" + req.query.respuesta);
  models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer',{respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
  })
};

exports.author = function(req, res){
  res.render('author', {});
};
