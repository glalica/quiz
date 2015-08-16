console.log("------------routes/index.js------------------------");
var express = require('express');
var router = express.Router();
//Añado elcontrolador del quiz
//Importo el enrutador
//var quizController = require('../controllers/quiz_controller');
var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller');

//var commentController = require('../controllers/comment_controller');
/* GET home page. */



router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //Autoload : quizId

// Definicion de rutas de session
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear session
//deberia ser router.delete  ¿pero no se porque lo pusieron asl?
router.get('/logout', sessionController.destroy); // destruir sesion

//añado los get de pregunta y respuesta
//Nos lleva a importar las acciones asociadas
// a answer y a question
router.get('/quizes',                        quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',      quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);

//Nuevo
router.get('/temas',                        quizController.showtemas);
router.get('temas/:tema',                   quizController.showbytema);
//router.get('/quizes/quest ion', quizController.question);
//router.get('/quizes/answer', quizController.answer);

//router.get('/author', quizController.author);
//Nuevo
router.get('/author',function(req,res){
	res.render('author', {
				fotoPerfil: '/images/foto.jpg',
				errors: []
	     });
});

module.exports = router;
