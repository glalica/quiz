console.log("------------routes/index.js------------------------");
var express = require('express');
var router = express.Router();
//Añado elcontrolador del quiz
//Importo el enrutador
var quizController = require('../controllers/quiz_controller');
/* GET home page. */



router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //Autoload : quizId

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
