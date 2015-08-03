//Es el controlador de los quizes

var models = require('../models/models.js');

// Autoload - Factoriza el código, si ruta inccluue quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz){
      if (quiz) {
        req.quiz = quiz;
        next();
      }
      else { next(new Error('No existe quizId=' + quizId));}
    }  //function
  ).catch(function(error) { next(error);});
};

// GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build( //Crea objeto Quiz
      { pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  // guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');
  })    // Redicción HTTP (URL relativo) lista de preguntas
};

// GET /quiizes
exports.index = function(req, res){
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};
// GET /quizes/question
//exports.question = function(req, res){
exports.show = function(req,res){
    res.render('quizes/show', { quiz: req.quiz});
};

//GET /quizes/answer
exports.answer = function(req, res){
    var resultado = "Incorrecto";
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
    }
    res.render('quizes/answer',
                {quiz: req.quiz, respuesta: resultado});
};

exports.author = function(req, res){
  res.render('author', {});
};
