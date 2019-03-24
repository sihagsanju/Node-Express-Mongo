const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/route');

const port = 8084;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);
app.listen(port ,()=>{
  console.log(`server is listning to port number: ${port}`);
})