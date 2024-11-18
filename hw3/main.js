var globalScale = 20
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


function drawVertex(vtx) {
    x = vtx.x;
    y = vtx.y;
    r = vtx.r;
    g = vtx.g;
    b = vtx.b;
    
    y = (height-1) - y; // 직관을 위해 y 반전
    x += 0.5, y += 0.5;
    var gs= globalScale;
    ctx.fillStyle = 
        "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.fillRect(x*gs - 0.5*gs, y*gs - 0.5*gs, gs, gs);
}

class Vertex {
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

function edgeFunction(a, b, c) {
    return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
}

function drawTriangle(v0, v1, v2) {
    // 삼각형의 bounding box 계산
    var minX = Math.max(0, Math.min(v0.x, v1.x, v2.x));
    var maxX = Math.min(width - 1, Math.max(v0.x, v1.x, v2.x));
    var minY = Math.max(0, Math.min(v0.y, v1.y, v2.y));
    var maxY = Math.min(height - 1, Math.max(v0.y, v1.y, v2.y));

    for (var y = minY; y <= maxY; y++) {
        for (var x = minX; x <= maxX; x++) {
            // 삼각형의 세 변을 기준으로 현재 픽셀의 위치가 삼각형 내부인지 판단
            var p = new Vertex(x, y, 0, 0, 0);
            var w0 = edgeFunction(v1, v2, p);
            var w1 = edgeFunction(v2, v0, p);
            var w2 = edgeFunction(v0, v1, p);

            if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
                // 삼각형 내부에 있는 경우 - Barycentric Coordinates를 이용하여 색상 보간
                var area = edgeFunction(v0, v1, v2);
                var alpha = w0 / area;
                var beta = w1 / area;
                var gamma = w2 / area;

                // 보간된 색상 계산
                var r = Math.round(alpha * v0.r + beta * v1.r + gamma * v2.r);
                var g = Math.round(alpha * v0.g + beta * v1.g + gamma * v2.g);
                var b = Math.round(alpha * v0.b + beta * v1.b + gamma * v2.b);

                // 픽셀 그리기
                drawVertex(new Vertex(x, y, r, g, b));
            }
        }
    }
}


vtx0 = new Vertex(3,5, 255, 0, 0);
vtx1 = new Vertex(13,25, 0, 255, 0);
vtx2 = new Vertex(25,10, 0, 0, 255);

drawVertex(vtx0);
drawVertex(vtx1);
drawVertex(vtx2);

drawTriangle(vtx0, vtx1, vtx2);
