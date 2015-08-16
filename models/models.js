console.log("------------models.js--------------------");
// Define como se construye todo el Modelo
var path = require('path');

// Postgres DATABASE_URL = prostgress://user:passwd@host:port/DATABASE_URL
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM (importa)
var Sequelize = require('sequelize');

// Usar BBDD SQLite     ES creada la base particularizada
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // Solo SQLite (.env)
    omitNull: true      // solo Postgres
    }
);

// Importar la defición de la tabla Quiz en quiz.js
//var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path =  path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz); //Relación
Quiz.hasMany(Comment);    //Relación 1 a N

// Se exporta pqra que pueda ser accedido desde otros lugares
exports.Quiz =  Quiz;   // exportar definición de tabla quiz
exports.Comment = Comment;

// sequelize.syn() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if (count === 0) {  //la tabla se inicializa solo si está vacia
      Quiz.bulkCreate(
        [ {pregunta: 'Capital de Italia', respuesta: 'Roma', tema: 'Otro'},
          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'Otro'}
        ]
      ).then(function(){console.log('---------Base de datos inicializada-----------')});
  };
});
});
