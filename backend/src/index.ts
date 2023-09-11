import app from './app';
import dbConnect from './libs/mongoose';
import config from './config';

dbConnect()
  .then(() => {
    console.log('MONGO DB CONNECTED');
  })
  .catch(() => {
    console.log('ERROR CONNECTING MONGO DB');
  });

process.on('uncaughtException', (err) => {
  console.log(err);
});
process.on('unhandledRejection', (err) => {
  console.log(err);
});

app.listen(config.port, () => {
  console.log('server on port ' + config.port);
});
