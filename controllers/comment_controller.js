var models = require('../models/models.js');

// GET /quizes/:quizId/comment/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors:[]});
};

// POST /quizes/: quizId/comment
exports.create = function(req,res) {
  var comment = models.Comment.build(
    { texto:  req.body.comment.texto,
      QuizId: req.params.quizId
    });
  comment
  .validate()
  .then(
    function(err){
      if (err){
        res.render('comment/new.ejs',
        {comment: comment, quizId:req.params.quizId, errors: err.errors});
      } else {
        comment //save: guarda en DB campo texto de comment
        .save()
        .then(function(){ res.redirect('/quizes/'+req.params.quizId)})
      }     // res.redirect: Redirecion HTTP a la lista de preguntas
    }
  ).catch(function(error){next(error)});
};