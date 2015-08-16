console.log("------------quizController--------------------");
//Es el controlador de los quizes

var models = require('../models/models.js');

// Autoload - Factoriza el código, si ruta inccluue quizId
exports.load = function(req, res, next, quizId) {
  console.log("------------load--------------------");
  //models.Quiz.findById(quizId).then(
  models.Quiz.find({
    where: { id: Number(quizId)},
    include: [{model: models.Comment}]
  }).then(function(quiz) {
    if (quiz) {
        req.quiz = quiz;
        next();
      }
//      else { next(new Error('No existe quizId=' + quizId));}
      else { next(new Error('No existe quizId=' + quizId))}
    }  //function
  ).catch(function(error) { next(error)});
};

// Nueva
exports.loadtema = function(req, res, next, tema){
    console.log("------------loadtema--------------------");
  models.Quiz.find(tema).then(
    function(tema){
      if (tema){
        req.tema = tema;
        next();
      } else {
        next(new Error('No existe quizId=' + tema));}
    }
  ).catch(function(error){next(error);});
};


// GET /quizes/new
exports.new = function(req, res){
  console.log("------------new--------------------");
    var quiz = models.Quiz.build( //Crea objeto Quiz
      { pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
console.log("------------create--------------------");
  var quiz = models.Quiz.build(req.body.quiz);
  // guarda en DB los campos pregunta y respuesta de quiz
  quiz
  .validate()
  .then(
    function(err){
      if (err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then(function(){ res.redirect('/quizes')})
        } //res.redirect: Rediccion HTTP a lista de preguntas
    }
  );
};

// GET /quiizes
// Nueva
//exports.index = function(req, res){
//  console.log("------------index--------------------");
//  models.Quiz.findAll().then(
//    function(quizes) {
//      res.render('quizes/index.ejs', {quizes: quizes, errors: []});
//    }
//  )
//  ).catch(function(error) { next (error);})-->
//};

// Nueva
exports.index = function(req, res){
  console.log("------------index--------------------");
  if (typeof(req.query.search) != 'undefined'){
    models.Quiz.findAll({
        where: ["pregunta like ?", '%' + req.query.search + '%'],
        order: 'pregunta ASC'
        }
      ).then(function(quizes){
        if (typeof(quizes != 'undefined')){
          res.render('quizes/index', {quizes: quizes, errors: []});
        }
        }
       ).catch(function(error) {next(error);})
    } else {
      models.Quiz.findAll({
				order : 'tema ASC'}
		  ).then(
			  function(quizes) {
				 res.render('quizes/index', { quizes: quizes, errors: []});
			  }
      ) //.catch(function(error) { next(error);})
	     }
     };


// GET /quizes/question
//exports.question = function(req, res){
exports.show = function(req,res){
  console.log("------------show--------------------");
    res.render('quizes/show', { quiz: req.quiz, errors: []});
};

//GET /quizes/answer
exports.answer = function(req, res){
console.log("------------answer--------------------");
    var resultado = "Incorrecto";
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
    }
    res.render('quizes/answer',
                {quiz: req.quiz, respuesta: resultado, errors: []});
};

// Get /quizes/:id/edit
exports.edit = function(req, res){
  console.log("------------edit--------------------");
  var quiz = req.quiz; // Autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

//Put /quizes/:id
exports.update = function(req, res) {
  console.log("------------update--------------------");
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then (
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors:err.errors});
      }  else {
          req.quiz  //save: guarda campos pregunta y respuesta en DB
          .save({fields: ["pregunta", "respuesta", "tema"]})
          .then( function(){ res.redirect('/quizes');});
        }   // Redirección HTTP a lista de pregurntas (URL relativo)
    }
  );
};

//Delete /quizes/:id
exports.destroy = function(req, res){
  console.log("------------destroy--------------------");
  req.quiz.destroy().then(function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

//new
exports.showtemas = function(req, res, next){
    console.log("------------showtemas--------------------");
    models.Quiz.findAll({
      atributes:['tema'],
      group:['tema']
    }
  ).then(
    function(quizes){
      res.render('temas/index', {quizes: quizes, errors: []});
    }
  ).catch(function(error) {next(error)});
}

//Nuevo
exports.showbytema = function(req,res){
    console.log("------------showbytema--------------------");
 	tema 			= req.params.tema
 	console.log(req.params.tema);
	models.Quiz.findAll({
			where: {
				tema: req.params.tema
			}
		}
	).then(
		function(quizes) {
			res.render('temas/showbytema.ejs', { quizes: quizes, errors: []});
		}
	).catch(function(error) { next(error)});
}


exports.author = function(req, res){
    console.log("------------autor--------------------");
  res.render('author', {});
};
