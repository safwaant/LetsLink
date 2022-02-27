var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const db = require('./initDB.js')
db.connect();

/*
setTimeout(() => {
    console.log('Host: ' + db.host + '\nPort: ' + db.port + '\nUser: ' + db.user + '\nDatabase: ' + db.database)
}, 200)
*/

var indexRouter = require('./routes/index');

var app = express();

const port = 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // http://localhost:3000/api/v1/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
