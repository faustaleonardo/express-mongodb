const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
