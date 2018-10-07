var express = require('express');
var socket = require('socket.io');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

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
var contents = fs.readFileSync("active_indices.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
io.on('connection',function(socket){
    io.sockets.emit('check',jsonContent);

    socket.on('prev1',function(data){
        if (jsonContent.Toilet==0){
            jsonContent.Toilet=5;
        }
        jsonContent.Toilet-=1;
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('prev1',jsonContent);
    });
    socket.on('next1',function(data){
        if (jsonContent.Toilet==4){
            jsonContent.Toilet=0;
        }
        else {
            jsonContent.Toilet+=1
        }
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('next1',jsonContent);
    });

    socket.on('prev2',function(data){
        if (jsonContent.Dish==0){
            jsonContent.Dish=5;
        }
        jsonContent.Dish-=1;
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('prev2',jsonContent);
    });
    socket.on('next2',function(data){
        if (jsonContent.Dish==4){
            jsonContent.Dish=0;
        }
        else {
            jsonContent.Dish+=1
        }
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('next2',jsonContent);
    });

    socket.on('prev3',function(data){
        if (jsonContent.Refresher==0){
            jsonContent.Refresher=5;
        }
        jsonContent.Refresher-=1;
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('prev3',jsonContent);
    });
    socket.on('next3',function(data){
        if (jsonContent.Refresher==4){
            jsonContent.Refresher=0;
        }
        else {
            jsonContent.Refresher+=1
        }
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('next3',jsonContent);
    });

    socket.on('prev4',function(data){
        if (jsonContent.Bag==0){
            jsonContent.Bag=5;
        }
        jsonContent.Bag-=1;
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('prev4',jsonContent);
    });
    socket.on('next4',function(data){
        if (jsonContent.Bag==4){
            jsonContent.Bag=0;
        }
        else {
            jsonContent.Bag+=1
        }
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('next4',jsonContent);
    });

    socket.on('prev5',function(data){
        if (jsonContent.Hand==0){
            jsonContent.Hand=5;
        }
        jsonContent.Hand-=1;
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('prev5',jsonContent);
    });
    socket.on('next5',function(data){
        if (jsonContent.Hand==4){
            jsonContent.Hand=0;
        }
        else {
            jsonContent.Hand+=1
        }
        fs.writeFileSync("active_indices.json",JSON.stringify(jsonContent));
        io.sockets.emit('next5',jsonContent);
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
  