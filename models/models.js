// Define como se construye todo el Modelo
var path = require('path');

// Cargar Modelo ORM (importa)
var Sequelize = require('sequelize');

// Usar BBDD SQLite     ES creada la base particularizada
var sequelize = new Sequelize(null,null,null,
                    {dialect: "sqlite", storage: "quiz.sqlite"}
                  );

// Importar la defición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Se exporta pqra que pueda ser accedido desde otros lugares
exports.Quiz =  Quiz;   // exportar definición de tabla quiz

// sequelize.syn() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
    if (count === 0) {  //la tabla se inicializa solo si está vacia
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                  })
    .success(function(){console.log('Base de datos inicializada')});
  };
});
});
