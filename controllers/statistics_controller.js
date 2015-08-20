var models = require('../models/models.js');

exports.show = function(req, res) {
  // Numero de quizes
  models.Quiz.count().then(function(_numQuizes){
   //Numero de comentarios
    models.Comment.count().then(function(_numComments){
      // Media de comentarios por pregunta
      var _mediaComments = _numComments/_numQuizes;
      //Busco preguntas sin comentarios
      models.Quiz.findAll({
        include:[{model: models.Comment}]
      }).then(function (quizes){
         var _conComment = 0;
         for (i in quizes){
           if (quizes[i].Comments.length)
             _conComment++;
         }
         var _sinComment = _numQuizes - _conComment;
         //res.render('estadisticas/index', {quizes: _numQuizes, numComments: _numComments,
         res.render('quizes/statistics.ejs', {quizes: _numQuizes, numComments: _numComments,
            mediaComments: _mediaComments, conComment: _conComment, sinComment: _sinComment,
            errors:[]
          });
      })
    })
  });
};
