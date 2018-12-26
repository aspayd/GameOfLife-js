var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(255, 255, 255)';

var width = 500;
var height = 500;
var cellWidth = 10;
var cellHeight = 10; 

var cells = [];

function setup(){
    var random;
    // Push a new cell object into the array for every cell column and row
    for(var col = 0; col < height; col++){
        if(col % cellHeight == 0){
            for(var row = 0; row < width; row++){
                if(row % cellWidth == 0){
                    random = Math.floor(Math.random() * 2);
                    cells.push({x: row, y: col, alive: random});
                }
            }
        }
    }

    console.table(cells);

    canvas.width = width;
    canvas.height = height;
}

var neighbors = [];
var liveNeighbors = 0;

function tick(){
    // GOL logic here

    // Find the neighbors of each cell
    for(var i = 0; i < cells.length; i++){
        
        if(cells[i].x == 0 && cells[i].y != 0){
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 49]);
            neighbors.push(cells[i + 1]);
            neighbors.push(cells[i + 100]);
            neighbors.push(cells[i + 101]);
        }else if(cells[i].y == 0 && cells[i].x != 0){
            neighbors.push(cells[i - 1]);
            neighbors.push(cells[i + 1]);
            neighbors.push(cells[i + 99]);
            neighbors.push(cells[i + 100]);
            neighbors.push(cells[i + 101]);
        }else if(cells[i].x == (width/cellWidth) && cells[i].y != (height/cellHeight)){
            neighbors.push(cells[cells[i].i - 51]);
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 1]);
            neighbors.push(cells[i + 99]);
            neighbors.push(cells[i + 100]);
        }else if(cells[i].y == (height/cellHeight) && cells[i].x != (width/cellWidth)){
            neighbors.push(cells[i - 51]);
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 49]);
            neighbors.push(cells[i - 1]);
            neighbors.push(cells[i + 1]);
        }else if(cells[i].x == 0 && cells[i].y == 0){
            neighbors.push(cells[i + 1]);
            neighbors.push(cells[i + 100]);
            neighbors.push(cells[i + 101]);
        }else if(cells[i].x == (width/cellWidth) && cells[i].y == (height/cellHeight)){
            neighbors.push(cells[i - 51]);
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 1]);
        }else if(cells[i].x == 0 && y == (height/cellHeight)){
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 49]);
            neighbors.push(cells[i + 1]);
        }else if(cells[i].y == 0 && x == (width/cellWidth)){
            neighbors.push(cells[i - 1]);
            neighbors.push(cells[i + 99]);
            neighbors.push(cells[i + 100]);
        }else{
            neighbors.push(cells[i - 51]);
            neighbors.push(cells[i - 50]);
            neighbors.push(cells[i - 49]);
            neighbors.push(cells[i - 1]);
            neighbors.push(cells[i + 1]);
            neighbors.push(cells[i + 99]);
            neighbors.push(cells[i + 100]);
            neighbors.push(cells[i + 101]);
        }

        // count live neighbors
        for(var j = 0; j < neighbors.length; j++){
            liveNeighbors += neighbors.alive;
        }

        // Add number of liveNeighbors to each cell
        

        liveNeighbors = 0;
        neighbors = [];
    }

    render();
}

function render(){
    // draw background
    ctx.fillStyle = 'rgb(50, 50, 50)';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // render cells
    for(var i = 0; i < cells.length; i++){
        if(cells[i].alive == 1){
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(cells[i].x, cells[i].y, cellWidth, cellHeight);
        }
    }
}

setup();

setInterval(tick, 1000/10);
