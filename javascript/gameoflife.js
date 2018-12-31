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
    for(var i = 0; i < rows; i++){
        cells[i] = [];
        for(var j = 0; j < cols; j++){
            // random 50% alive state seed
            random = Math.floor(Math.random() * 2);
            cells[i][j] = {x: i * cellWidth, y: j * cellHeight, alive: random, neighbors: null};
        }
    }

    console.table(cells);

    canvas.width = width;
    canvas.height = height;

    tick();
}

// GOL logic here
function tick(){
    // find the neighbors of each cell
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            // if corner or edge only count cells in array range
            if((i == 0) || (j == 0) || (i == rows - 1) || (j == cols - 1)){
                // corners
                if((i == 0) && (j == 0)){ // top left corner
                    cells[i][j].neighbors += cells[i+1][j].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                    cells[i][j].neighbors += cells[i+1][j+1].alive;
                }else if((i == rows - 1) && (j == cols - 1)){ // bottom right corner
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                }else if((i == 0) && (j == cols - 1)){ // bottom left corner
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                }else if((i == rows - 1) && (j == 0)){ // top right corner
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i-1][j+1].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                }
                // edges
                else if((i == 0) && (j != 0)){ // left edge
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                    cells[i][j].neighbors += cells[i+1][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                    cells[i][j].neighbors += cells[i+1][j+1].alive;
                }else if((i != 0) && (j == 0)){ // top edge
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i-1][j+1].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                    cells[i][j].neighbors += cells[i+1][j+1].alive;
                }else if((i == rows - 1) && (j != 0)){ // right edge
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i-1][j+1].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                }else if((i != 0) && (j == cols - 1)){ // bottom edge
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                }
                // center cells
            }else{
                cells[i][j].neighbors += cells[i-1][j-1].alive;
                cells[i][j].neighbors += cells[i][j-1].alive;
                cells[i][j].neighbors += cells[i+1][j-1].alive;
                cells[i][j].neighbors += cells[i-1][j].alive;
                cells[i][j].neighbors += cells[i+1][j].alive;
                cells[i][j].neighbors += cells[i-1][j+1].alive;
                cells[i][j].neighbors += cells[i][j+1].alive;
                cells[i][j].neighbors += cells[i+1][j+1].alive;
            }
        }
    }
    
    render();
}

function render(){
    // draw background
    ctx.fillStyle = 'rgb(50, 50, 50)';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // render cells
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            if(cells[i][j].alive == 1){
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}

setup();