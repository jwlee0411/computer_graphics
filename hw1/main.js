var globalScale = 10
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var width = canvas.width / globalScale;
var height = canvas.height / globalScale;

console.log(width + ", " + height);

function drawGrid() {
    ctx.fillStyle = "#CCC";
    for(var x = 0; x < width; x++)
        ctx.fillRect(x*globalScale - 0.5, 0.5, 1, height*globalScale);
    for(var y = 0; y < height; y++)
        ctx.fillRect(0.5, y*globalScale - 0.5, width*globalScale, 1);
        
    ctx.font = "18px Helvetica";
    ctx.fillStyle = "#bbb";
    ctx.fillText("(0,0)", 5, height*globalScale - 5);
    ctx.textBaseline = "hanging";
    ctx.textAlign = "end";
    ctx.fillText(`(${width-1}, ${height-1})`, width*globalScale - 5, 5);
}
drawGrid();

function drawPoint(x, y) {
    y = (height-1) - y; // 직관을 위해 y 반전
    x += 0.5, y += 0.5;
    var gs= globalScale;
    ctx.fillStyle = "black";
    ctx.fillRect(x*gs - 0.5*gs, y*gs - 0.5*gs, gs, gs);
}

// =============================
// Write your code below 
// - resolution: 30 x 30
// -----------------------------

function drawLine_v1(x1, y1, x2, y2) {

    var dx = x2 - x1;
    var dy = y2 - y1;
    
    // x 증가량에 따른 y 값 계산
    var slope = dy / dx;

    var x = x1;
    var y = y1;

    while (x <= x2) {
        drawPoint(Math.round(x), Math.round(y));
        x += 1;
        y += slope; 
    }
   

}
/* drawLine_v1(0, 0, 10, 29); */



function drawLine_v2(x1, y1, x2, y2) {

    var x = x1;
    var y = y1;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var step = Math.max(Math.abs(dx), Math.abs(dy));

    var xIncrement = dx / step;
    var yIncrement = dy / step;

    for (var i = 0; i <= step; i++) {
        drawPoint(Math.round(x), Math.round(y));
        x += xIncrement;
        y += yIncrement;
    }
}

/* drawLine_v2(0, 0, 10, 29); */

function drawLine_DDA(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var m = dy / dx;

    if (Math.abs(m) <= 1) {
        var x = x1;
        var y = y1;

        for (var k = 0; k <= Math.abs(dx); k++) {
            drawPoint(Math.round(x), Math.round(y));
            x += 1;
            y += m;
        }
    } else {
        var x = x1;
        var y = y1;

        for (var k = 0; k <= Math.abs(dy); k++) {
            drawPoint(Math.round(x), Math.round(y));
            y += 1;
            x += 1 / m;
        }
    }
}
drawLine_DDA(0, 0, 10, 29);