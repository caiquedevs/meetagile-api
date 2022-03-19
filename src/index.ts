import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3333;

app
  .listen(port, () => {
    console.table({
      develop: `http://localhost:${port}`,
      prd: 'Pendente',
    });
  })
  .on('error', (e: any) => {
    console.log('Error happened: ', e.message);
  });
