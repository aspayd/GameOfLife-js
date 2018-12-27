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
            cells[i][j] = {x: i * 10, y: j * 10, alive: random, neighbors: null};
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
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            // if corner or edge only count cells in array range
            if((i == 0) || (j == 0) || (i == cols - 1) || (j == rows - 1)){
                // corners
                if((i == 0) && (j == 0)){ // top left corner
                    cells[i][j].neighbors += cells[i+1][j].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                    cells[i][j].neighbors += cells[i+1][j+1].alive;
                }else if((i == cols - 1) && (j == rows - 1)){ // bottom right corner
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                }else if((i == 0) && (j == rows - 1)){ // bottom left corner
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                }else if((i == cols - 1) && (j == 0)){ // top right corner
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
                }else if((i == cols - 1) && (j != 0)){ // right edge
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i-1][j+1].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i][j+1].alive;
                }else if((i != 0) && (j == rows - 1)){ // bottom edge
                    cells[i][j].neighbors += cells[i-1][j-1].alive;
                    cells[i][j].neighbors += cells[i-1][j].alive;
                    cells[i][j].neighbors += cells[i][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j-1].alive;
                    cells[i][j].neighbors += cells[i+1][j].alive;
                }

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

    // var x = 1;
    // var y = 1;

    // cells[x][y].neighbors += cells[x-1][y-1].alive;
    // cells[x][y].neighbors += cells[x][y-1].alive;
    // cells[x][y].neighbors += cells[x+1][y-1].alive;
    // cells[x][y].neighbors += cells[x-1][y].alive;
    // cells[x][y].neighbors += cells[x+1][y].alive;
    // cells[x][y].neighbors += cells[x-1][y+1].alive;
    // cells[x][y].neighbors += cells[x][y+1].alive;
    // cells[x][y].neighbors += cells[x+1][y+1].alive;

    
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
            if(cells[i][j].alive == 1){
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}

setup();