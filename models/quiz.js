// Definicion del modelo de quiz
//Crea una tabla con dos tipos
// Quiz es el constructor de objetos
//pregunta y respuesta son las dos columnas con datos tipo string
 module.exports = function(sequelize, DataTypes) {
   return sequelize.define('Quiz',
          { pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING,
        });
 }
