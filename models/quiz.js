console.log("------------quiz.js--------------------");
// Definicion del modelo de quiz
//Crea una tabla con dos tipos
// Quiz es el constructor de objetos
//pregunta y respuesta son las dos columnas con datos tipo string
 module.exports = function(sequelize, DataTypes) {
   return sequelize.define(
     'Quiz',
    { pregunta:{
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Tema"} }
      }
    }
  );
}
