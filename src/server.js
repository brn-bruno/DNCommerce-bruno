import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

// ESCUTAR A PORTA 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);

})