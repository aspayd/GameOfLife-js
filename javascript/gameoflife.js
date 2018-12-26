var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(255, 255, 255)';

var width = 500;
var height = 500;
var cellWidth = 10;
var cellHeight = 10;

var cols = height / cellHeight;
var rows = width / cellWidth;

var cells = [];

function setup(){
    // Create the empty 2d Array of Cells
    
    var random;
    for(var i = 0; i < cols; i++){
            cells[i] = [];
            for(var j = 0; j < rows; j++){
                    // random 50% alive state seed
                    random = Math.floor(Math.random() * 2);
                    cells[i][j] = random;
                }
    }

    console.table(cells);

    canvas.width = width;
    canvas.height = height;
}

var neighbors = [];

// GOL logic here
function tick(){
    // find the neighbors of each cell
    

        // count live neighbors
        for(var j = 0; j < neighbors.length; j++){
            // cells[i].neighbors += neighbors[j].alive;
        }

        // countNeighbors = 0;
        neighbors = [];
    

    render();
}

function render(){
    // draw background
    ctx.fillStyle = 'rgb(50, 50, 50)';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // render cells
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(cells[i][j] == 1){
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}

setup();

// tick and render at 10 fps
// tick every time the button is clicked if commented out 
// setInterval(tick, 1000/10);

