const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 🎇. Shutting down...');
  console.log(err.name);
  process.exit(1);
});

dotenv.config({
  path: './config.env'
});

const app = require('./app');

const port = process.env.PORT || 8080;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log('MongoDB connected!');
  });

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 🎇. Shutting down...');
  console.log(err.name);
  server.close(() => {
    process.exit(1);
  });
});
