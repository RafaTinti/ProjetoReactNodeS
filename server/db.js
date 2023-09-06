// get the client
import mysql from 'mysql2';

// create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto_tecnico',
});

