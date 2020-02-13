const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

const app = require(`./app`);
const port = 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
