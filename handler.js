'use strict';
//import sql connections
var db = require('./Sqlconnection');

//insert todo service
module.exports.insertTodo = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const todo = JSON.parse(event.body);
  db.one('INSERT INTO todos (title, description ,createat,done,id) VALUES($1, $2, $3, $4,$5) RETURNING id', [todo.title, todo.description, todo.createat,todo.done,todo.id])
    .then(data => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(todo),
        headers: {'Content-Type': 'application/json'}
    });
    })
    .catch(error => {
        console.log('ERROR:', error); // print error;
        callback(null, {
          statusCode: 401,
          body: JSON.stringify("error occoured!"),
          headers: {'Content-Type': 'application/json'}
      });
    });


};


//insert todo service
module.exports.getTodos = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
    //get all todos
      db.any('SELECT * FROM todos')
      .then(function(data) {
          // success;
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
      })
      .catch(function(error) {
          // error;
          callback(null, {
            statusCode: 401,
            body: JSON.stringify(error),
            headers: {'Content-Type': 'application/json'}
        });
      });


};


//update todo service
module.exports.updateTodos = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let id = event.pathParameters.id;
  const updatetodo = JSON.parse(event.body);
  db.result('UPDATE todos SET title = $1, description = $2, done =$3  WHERE id = $4', [updatetodo.title, updatetodo.description, updatetodo.done ,id])
      .then(function(data) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify("successfully updated!"),
          headers: {'Content-Type': 'application/json'}
      });
      })
      .catch(function(error) {
          // error;
          callback(null, {
            statusCode: 401,
            body: JSON.stringify("error occourd!"),
            headers: {'Content-Type': 'application/json'}
        });
      });


};
//delte todo service
module.exports.deleteTodos = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let id = event.pathParameters.id;
  
  db.result('DELETE FROM todos WHERE id = $1', id)
      .then(result => {

        callback(null, {
          statusCode: 200,
          body: JSON.stringify("successfully deleted"),
          headers: {'Content-Type': 'application/json'}
      });

      })
      .catch(error => {
        callback(null, {
          statusCode: 401,
          body: JSON.stringify("error occoured!"),
          headers: {'Content-Type': 'application/json'}
      });
      });


};