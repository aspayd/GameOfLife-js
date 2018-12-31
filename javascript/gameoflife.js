var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(255, 255, 255)';

var width = 1350;
var height = 570;
var cellWidth = 5;
var cellHeight = 5;

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
            cells[i][j] = {alive: random, neighbors: null};
        }
    }

    console.table(cells);

    canvas.width = width;
    canvas.height = height;

    tick();
}

function countNeighbors(){
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
}

function checkRules(){

    // Game Rules:
    // 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // 2. Any live cell with two or three live neighbors lives on to the next generation.
    // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            // if the cell is alive
            if(cells[i][j].alive == 1){
                if(cells[i][j].neighbors < 2){ // death by underpopulation
                    cells[i][j].alive = 0;
                }else if((cells[i][j].neighbors == 2) || (cells[i][j].neighbors == 3)){ // lives on to next generation
                    cells[i][j].alive = 1;
                }else if(cells[i][j].neighbors > 3){ //death by overpopulation
                    cells[i][j].alive = 0;
                }
            }else if(cells[i][j].alive == 0){ // the cell is dead
                if(cells[i][j].neighbors == 3){ // becomes alive by reproduction
                    cells[i][j].alive = 1;
                }
            }
        }
    }
}

function clearNeighbors(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            cells[i][j].neighbors = 0;
        }
    }
}

// GOL logic here
function tick(){

    countNeighbors();

    checkRules();

    clearNeighbors();

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
                ctx.fillStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}

setup();