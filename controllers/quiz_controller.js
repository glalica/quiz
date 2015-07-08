//Es el controlador de los quizes
// GET /quizes/question
exports.question = function(req, res){
  res.render('quizes/question',{pregunta:'Capital de Italia'});
};

//GET /quizes/answer
exports.answer = function(req, res){
  //console.log("req.query.respuesta" + req.query.respuesta);
  if (req.query.respuesta === 'Roma'){
    res.render('quizes/answer',{respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};
