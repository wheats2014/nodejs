var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '3015891',
  database : 'test'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  connection.query('select * from user', function(error, results, fields) {
    if (error) {
      throw error;
    }
    // connected!
    console.log(fields);
    console.log(results);

    connection.end();
  });

  console.log('connected as id ' + connection.threadId);
});
