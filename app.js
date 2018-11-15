var express = require('express');
var socket = require('socket.io');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var webentryRouter = require('./routes/webentry');


// app start and setup
var app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var port = normalizePort(process.env.PORT || '3000');
app.set('port',port);
var server = app.listen(port,function(){
    console.log('server listen on port ' + port);
})

app.use('/', indexRouter);
app.use('/webentry',webentryRouter);


var io = socket(server);
var mongoDB = 'mongodb://storeinfo:dab420@ds024548.mlab.com:24548/dirawebdb';
mongoose.connect(mongoDB,{useNewUrlParser : true });
mongoose.Promise = global.Promise;
// Define to JSON type
var Schema = mongoose.Schema;
var SpinnerSchema = new Schema(
    {
        _id : { type : String , required : true},
        active_index : {type: Number , requried : true}
    }
);

var SpinnerModel = mongoose.model('SpinnerModel',SpinnerSchema);

io.on('connection',function(socket){
    SpinnerModel.find(function (err,active_indices){
        var actual_active_indices = [ 
            active_indices[0].active_index,
            active_indices[1].active_index,
            active_indices[2].active_index,
            active_indices[3].active_index,
            active_indices[4].active_index      
        ]
        io.sockets.emit('check',actual_active_indices);
    });

    socket.on('prev1',function(){
        SpinnerModel.findById('Toilet',function (err,spinner){
            if (spinner.active_index == 0 ){
                spinner.active_index = 5;
            }
            spinner.active_index -=1;
            spinner.save(function (){});
            io.sockets.emit('prev1',spinner.active_index);
        });
    });
    socket.on('next1',function(){
        SpinnerModel.findById('Toilet',function (err,spinner){
            if (spinner.active_index == 4 ){
                spinner.active_index = 0;
            }
            else {
                spinner.active_index +=1;
            }
            spinner.save(function (){});
            io.sockets.emit('next1',spinner.active_index);
        });
    });
    socket.on('prev2',function(){
        SpinnerModel.findById('Dish',function (err,spinner){
            if (spinner.active_index == 0 ){
                spinner.active_index = 5;
            }
            spinner.active_index -=1;
            spinner.save(function (){});
            io.sockets.emit('prev2',spinner.active_index);
        });
    });
    socket.on('next2',function(){
        SpinnerModel.findById('Dish',function (err,spinner){
            if (spinner.active_index == 4 ){
                spinner.active_index = 0;
            }
            else {
                spinner.active_index +=1;
            }
            spinner.save(function (){});
            io.sockets.emit('next2',spinner.active_index);
        });
    });

    socket.on('prev3',function(){
        SpinnerModel.findById('Refresher',function (err,spinner){
            if (spinner.active_index == 0 ){
                spinner.active_index = 5;
            }
            spinner.active_index -=1;
            spinner.save(function (){});
            io.sockets.emit('prev3',spinner.active_index);
        });
    });
    socket.on('next3',function(){
        SpinnerModel.findById('Refresher',function (err,spinner){
            if (spinner.active_index == 4 ){
                spinner.active_index = 0;
            }
            else {
                spinner.active_index +=1;
            }
            spinner.save(function (){});
            io.sockets.emit('next3',spinner.active_index);
        });
    });

    socket.on('prev4',function(){
        SpinnerModel.findById('Floor',function (err,spinner){
            if (spinner.active_index == 0 ){
                spinner.active_index = 5;
            }
            spinner.active_index -=1;
            spinner.save(function (){});
            io.sockets.emit('prev4',spinner.active_index);
        });
    });
    socket.on('next4',function(){
        SpinnerModel.findById('Floor',function (err,spinner){
            if (spinner.active_index == 4 ){
                spinner.active_index = 0;
            }
            else {
                spinner.active_index +=1;
            }
            spinner.save(function (){});
            io.sockets.emit('next4',spinner.active_index);
        });
    });

    socket.on('prev5',function(){
        SpinnerModel.findById('Hand',function (err,spinner){
            if (spinner.active_index == 0 ){
                spinner.active_index = 5;
            }
            spinner.active_index -=1;
            spinner.save(function (){});
            io.sockets.emit('prev5',spinner.active_index);
        });
    });
    socket.on('next5',function(){
        SpinnerModel.findById('Hand',function (err,spinner){
            if (spinner.active_index == 4 ){
                spinner.active_index = 0;
            }
            else {
                spinner.active_index +=1;
            }
            spinner.save(function (){});
            io.sockets.emit('next5',spinner.active_index);
        });
    });
});

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  