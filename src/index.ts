import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3333;

app
  .listen(port, () => {
    console.table({
      localhost: `http://localhost:${port}`,
      production: 'https://meetagile-api-v2.herokuapp.com',
    });
  })
  .on('error', (e: any) => {
    console.log('Error happened: ', e.message);
  });
