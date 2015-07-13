console.log("routes/index.js")
var express = require('express');
var router = express.Router();
//Añado elcontrolador del quiz
//Importo el enrutador
var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
/*router.get('/', function(req, res) {
  res.render('creditos', {title: 'Quiz'});
}*/


//añado los get de pregunta y respuesta
//Nos lleva a importar las acciones asociadas
// a answer y a question
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', quizController.author);


module.exports = router;
