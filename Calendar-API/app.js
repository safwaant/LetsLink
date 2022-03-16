var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');


const personRouter = require('./routes/person');
const loginRouter = require('./routes/login');
const personDayRouter = require('./routes/personcal');
const groupRouter = require('./routes/groupcal');
const client = require('./initDB');


var app = express();

app.set('view engine', 'ejs');


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

console.log('connecting to client');
client.connect();
console.log('after connecting to client');
app.use('/api/v1/', indexRouter); // http://localhost:3000/api/v1/
app.use('/api/v1/person/', personRouter); // http://localhost:3000/api/v1/person/
app.use('/api/v1/login/', loginRouter); // http://localhost:3000/api/v1/login/
app.use('/api/v1/personCal/', personDayRouter); // http://localhost:3000/api/v1/personCal/
app.use('/api/v1/groupCal/', groupRouter); // http://localhost:3000/api/v1/group/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

console.log('After catching 404');
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

console.log('Before export')
module.exports = app;
