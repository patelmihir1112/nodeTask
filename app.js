require("dotenv/config");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
require("./database")

let indexRouter = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
  });
  
  // error handler
  app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    return res.status(status).json({
      status: status,
      success: false,
      message,
      data,
    });
  });

app.listen(port, function(){
    console.log('app listening on port: '+port);
});