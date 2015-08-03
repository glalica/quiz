//Es el controlador de los quizes

var models = require('../models/models.js');

// GET /quiizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes});
  })
};
// GET /quizes/question
//exports.question = function(req, res){
exports.show = function(req,res){
//models.Quiz.findAll().then(function(quiz) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show',{ quiz: quiz});
    //res.render('quizes/question',{pregunta: quiz[0].pregunta})
  })
};

//GET /quizes/answer
exports.answer = function(req, res){
  //console.log("req.query.respuesta" + req.query.respuesta);
  //models.Quiz.findAll().then(function(quiz) {
    models.Quiz.findById(req.params.quizId).then(function(quiz){
    if (req.query.respuesta === quiz.respuesta) {
      //res.render('quizes/answer',{respuesta: 'Correcto'});
      res.render('quizes/answer',
                {quiz: quiz, respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer',
                { quiz: quiz, respuesta: 'Incorrecto'});
    }
  })
};

exports.author = function(req, res){
  res.render('author', {});
};
