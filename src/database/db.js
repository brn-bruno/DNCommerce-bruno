import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'dncommerce',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados!' + err.stack);
        return;
    }

    console.log('Conexão bem-sucedida com o banco de dados.');
})

export default connection;