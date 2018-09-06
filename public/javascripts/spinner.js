var socket = io();

function dataToColorArray(data){
    var colors_array = ["gray","gray","gray","gray","gray"]
    colors_array[data]="darkcyan"
    return colors_array;
}

var myCanvas = document.getElementById("can1");
myCanvas.width = 300;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");

var myCanvas2 = document.getElementById("can2");
myCanvas2.width = 300;
myCanvas2.height = 300;
var ctx = myCanvas2.getContext("2d");

var myCanvas3 = document.getElementById("can3");
myCanvas3.width = 300;
myCanvas3.height = 300;
var ctx = myCanvas3.getContext("2d");

var myCanvas4 = document.getElementById("can4");
myCanvas4.width = 300;
myCanvas4.height = 300;
var ctx = myCanvas4.getContext("2d");

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.id = options.id;
    this.curr_idx = options.curr_idx;

    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            total_value += 1;
        }

        var start_angle = 0;
        for (categ in this.options.data){
            var slice_angle = 2 * Math.PI / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
            drawPieSliceEmpty(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle
            )
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(this.options.data[categ], labelX,labelY);
            start_angle += slice_angle;
            color_index++;  
        } 
    }
    
    this.putColorArray = function(active_index){
        this.curr_idx = active_index;
        this.colors = dataToColorArray(active_index);
    }
}

var myVinyls = {
    "room1": 'guy1',
    "room2": 'guy2',
    "room3": 'guy3',
    "room4": 'guy4',
    "room5": 'guy5'
};

var Toilet = new Piechart(
    {
        canvas:myCanvas,
        data:myVinyls,
        colors:["gray","gray","gray","gray","gray"],
        id: 'Toilet',
        curr_idx : 0
    }
);
var Dish = new Piechart(
    {
        canvas:myCanvas2,
        data:myVinyls,
        colors:["gray","gray","gray","gray","gray"],
        id : 'Dish',
        curr_idx : 0
    }
);
var Bag = new Piechart(
    {
        canvas:myCanvas3,
        data:myVinyls,
        colors:["gray","gray","gray","gray","gray"],
        id: 'Bag',
        curr_idx : 0
    }
);
var Refresher = new Piechart(
    {
        canvas:myCanvas4,
        data:myVinyls,
        colors:["gray","gray","gray","gray","gray"],
        id: 'Refresher',
        curr_idx : 0
    }
);

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
function drawPieSliceEmpty(ctx,centerX,centerY,radius,startAngle,endAngle){
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth=0.5;
    ctx.strokeStyle="black";
    ctx.stroke();
    ctx.closePath();  
}

// initial setup on get

socket.on('check',function(data){

    Toilet.putColorArray(data["Toilet"]);
    Dish.putColorArray(data["Dish"]);
    Refresher.putColorArray(data["Refresher"]);
    Bag.putColorArray(data["Bag"]);

    Toilet.draw();
    Dish.draw();
    Bag.draw();
    Refresher.draw();
});

// Toilet spin

var prev1 = document.getElementById('prev1');
prev1.addEventListener('click',function(){
    socket.emit('prev1',{});
});
socket.on('prev1',function(data){
    Toilet.putColorArray(data["Toilet"]);
    Toilet.draw();
});
var next1 = document.getElementById('next1');
next1.addEventListener('click',function(){
    socket.emit('next1',{});
});
socket.on('next1',function(data){
    Toilet.putColorArray(data["Toilet"]);
    Toilet.draw();
});

// Dish spin

var prev2 = document.getElementById('prev2');
prev2.addEventListener('click',function(){
    socket.emit('prev2',{});
});
socket.on('prev2',function(data){
    Dish.putColorArray(data["Dish"]);
    Dish.draw();
});
var next2 = document.getElementById('next2');
next2.addEventListener('click',function(){
    socket.emit('next2',{});
});
socket.on('next2',function(data){
    Dish.putColorArray(data["Dish"]);
    Dish.draw();
});

// Refresher spin

var prev3 = document.getElementById('prev3');
prev3.addEventListener('click',function(){
    socket.emit('prev3',{});
});
socket.on('prev3',function(data){
    Refresher.putColorArray(data["Refresher"]);
    Refresher.draw();
});
var next3 = document.getElementById('next3');
next3.addEventListener('click',function(){
    socket.emit('next3',{});
});
socket.on('next3',function(data){
    Refresher.putColorArray(data["Refresher"]);
    Refresher.draw();
});

// Bag spin

var prev4 = document.getElementById('prev4');
prev4.addEventListener('click',function(){
    socket.emit('prev4',{});
});
socket.on('prev4',function(data){
    Bag.putColorArray(data["Bag"]);
    Bag.draw();
});
var next4 = document.getElementById('next4');
next4.addEventListener('click',function(){
    socket.emit('next4',{});
});
socket.on('next4',function(data){
    Bag.putColorArray(data["Bag"]);
    Bag.draw();
});





