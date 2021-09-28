"use strict";

var gl;
var ctx;
var canvas;
var angle = 10;
var brush = false;
var layer;
var canvasWidth = 1024;
var canvasHeight = 600;
var objectX = 160;
var objectY = 60;
var sw = 2;
var rect;
var grid;
var square;
var triangle;
var line;
var poly;
var ellipse;
var arrow;
var stage;
var circle;
var deleteItem = false;
var zoomObj = false;
var stk = 'black'
var removeTransformer = false;

/**
 * init function
 */
function init() {
    // create canvas
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    stage = new Konva.Stage({
        container: 'container',
        width: canvasWidth,
        height: canvasHeight
    });
    layer = new Konva.Layer();
    stage.add(layer);
};

/**
 *  draw circle
 */
function createCircle() {
    circle = new Konva.Circle({
        x: objectX,
        y: objectY,
        radius: 50,
        name: 'circle',
        stroke: stk,
        strokeWidth: sw,
        draggable: true
    });
    brush = false;
    layer.add(circle);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        // do nothing if clicked NOT on our circle
        if (!e.target.hasName('circle')) {
            return;
        }
        // remove old transformers
        // TODO: we can skip it if current circle is already selected
        stage.find('Transformer').destroy();
        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    circle.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    circle.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    circle.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw rectangle
 */
function createRectangle() {
    rect = new Konva.Rect({
        x: objectX,
        y: objectY,
        width: 150,
        height: 90,
        name: 'rect',
        stroke: stk,
        draggable: true,
        strokeWidth: sw,
    });
    brush = false;
    layer.add(rect);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('rect')) {
            return;
        }
        stage.find('Transformer').destroy();
        if (deleteItem == true) {
            stage.find('Transformer').destroy();
            e.target.remove();
            deleteItem = false;
            // layer.draw();
            layer.draw();
            removeTransformer = true;
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    rect.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    rect.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    rect.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}



/**
 * draw Line
 */
function createLine() {
    line = new Konva.Line({
        points: [125, 170, objectX, objectY],
        stroke: stk,
        draggable: true,
        name: 'line',
        strokeWidth: sw
    });
    brush = false;
    layer.add(line);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('line')) {
            return;
        }
        stage.find('Transformer').destroy();
        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    line.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    line.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    line.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 *  draw Triangle
 */
function createTriangle() {
    triangle = new Konva.RegularPolygon({
        x: objectX,
        y: objectY + 30,
        sides: 3,
        radius: 50,
        name: 'triangle',
        stroke: stk,
        strokeWidth: sw,
        draggable: true
    });
    brush = false;
    layer.add(triangle);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('triangle')) {
            return;
        }
        stage.find('Transformer').destroy();
        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    triangle.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    triangle.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    triangle.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw polygon
 */
function createPolygon() {
    poly = new Konva.RegularPolygon({
        x: objectX,
        y: objectY + 90,
        sides: 6,
        radius: 60,
        // fill: 'red',
        stroke: stk,
        strokeWidth: sw,
        draggable: true,
        name: 'poly'
    });
    brush = false;
    layer.add(poly);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('poly')) {
            return;
        }
        stage.find('Transformer').destroy();

        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    poly.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    poly.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    poly.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw Square
 */
function createSquare() {
    square = new Konva.Rect({
        x: objectX,
        y: objectY,
        width: 90,
        height: 90,
        name: 'square',
        stroke: stk,
        draggable: true,
        strokeWidth: sw,
    });
    brush = false;
    layer.add(square);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('square')) {
            return;
        }
        stage.find('Transformer').destroy();

        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    square.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    square.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    square.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw Ellipse
 */
function createArrow() {
    arrow = new Konva.Arrow({
        x: objectX,
        y: objectY,
        points: [0, 0, objectX, objectY],
        pointerLength: 20,
        pointerWidth: 20,
        // fill: 'black',
        stroke: stk,
        strokeWidth: sw,
        draggable: true,
        name: 'arrow'
    });
    brush = false;
    layer.add(arrow);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('arrow')) {
            return;
        }
        stage.find('Transformer').destroy();

        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    arrow.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    arrow.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    arrow.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw Ellipse
 */
function createEllipse() {
    ellipse = new Konva.Ellipse({
        x: objectX,
        y: objectY,
        radiusX: 100,
        radiusY: 50,
        stroke: stk,
        strokeWidth: sw,
        draggable: true,
        name: 'ellipse',
    });
    layer.add(ellipse);
    layer.draw();
    stage.on('click tap', function (e) {
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('ellipse')) {
            return;
        }
        stage.find('Transformer').destroy();

        if (deleteItem == true) {
            e.target.remove();
            deleteItem = false;
            layer.draw();
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    ellipse.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    ellipse.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    ellipse.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * draw BezierCurve
 */
function createBezierCurve() {
    var bezier = new Konva.Shape({
        width: 200,
        height: 100,
        name: 'bezier',
        x: objectX,
        y: objectY,
        stroke: stk,
        draggable: true,
        strokeWidth: sw,
        sceneFunc: function (context, shape) {
            // Cubic Bézier curve
            context.beginPath();
            context.moveTo(10, 20);
            context.bezierCurveTo(50, 50, 20, 110, 190, 60);
            context.stroke();
            context.fillStrokeShape(shape);
        }
    });
    brush = false;
    layer.add(bezier);
    layer.draw();
    stage.on('click tap', function (e) {
        brush = false;
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        }
        if (!e.target.hasName('bezier')) {
            return;
        }
        stage.find('Transformer').destroy();
        if (deleteItem == true) {
            stage.find('Transformer').destroy();
            e.target.remove();
            deleteItem = false;
            // layer.draw();
            layer.draw();
            removeTransformer = true;
        } else if (removeTransformer == false) {
            // create new transformer
            var tr = new Konva.Transformer({
                // anchorStroke: 'blue',
                anchorFill: '#00ffff',
                anchorSize: 7,
                // borderStroke: 'blue',
                borderDash: [3, 3]
            });
            layer.add(tr);
            tr.attachTo(e.target);
            layer.draw();
        } else {
            removeTransformer = false;
        }
    });
    bezier.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    bezier.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    bezier.on('dragstart', function () {
        this.moveToTop();
        layer.draw();
    });
    zoomOnwheel();
}

/**
 * saves Image
 */
function saveImage() {
    var link = document.createElement('a');
    link.download = 'canvas.jpeg';
    link.href = stage.toDataURL({ pixelRatio: 3 });;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function savePDF() {
    var pdf = new jsPDF('l', 'px', [canvasWidth+500, canvasHeight]);
    pdf.setTextColor('#000000');
    // first add texts
    stage.find('Text').forEach(text => {
        const size = text.fontSize() / 0.75; // convert pixels to points
        pdf.setFontSize(size);
        pdf.text(text.text(), text.x(), text.y(), {
            baseline: 'top',
            angle: -text.getAbsoluteRotation()
        });
    });

    // then put image on top of texts (so texts are not visible)
    pdf.addImage(
        stage.toDataURL({ pixelRatio: 1 }),
        0,
        0,
       850,
        450
    );

    pdf.save('canvas.pdf');
}

/**
 * this method save the file in JSON
 */
function saveJSON() {
    // save stage as a json string
    var json = stage.toJSON();
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'canvas.json';
    a.innerHTML = 'download JSON';
    var container = document.getElementById('container');
    container.appendChild(a);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * 
 * @param {*} e 
 */
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        displayJSON(contents);
    };
    reader.readAsText(file);
}

function displayJSON(contents) {
    // create node using json string
    var stage = Konva.Node.create(JSON.parse(contents), 'container');
}

function deleteObj() {
    deleteItem = true;
}

/**
 * zooms on mouse
 */
function zoomOnwheel() {
    var scaleBy = 1.01;
    stage.on('wheel', e => {
        if (zoomObj == true) {
            e.evt.preventDefault();
            var oldScale = stage.scaleX();

            var mousePointTo = {
                x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
                y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
            };

            var newScale =
                e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({ x: newScale, y: newScale });

            var newPos = {
                x:
                    -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                    newScale,
                y:
                    -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                    newScale
            };
            stage.position(newPos);
            stage.batchDraw();
        }
    });
}

function zoom() {
    if (zoomObj == true) {
        zoomObj = false;
    } else {
        zoomObj = true;
    }
}

function colorPickerM() {
    stk = document.getElementById("color").value;
}

/**
 * 
 */
function changeSW() {
    sw = parseInt(document.getElementById("sw").value);
}
/**
 * clear the canvas
 */
function clearS() {
    location.reload();
}

function drawBoard() {
    grid = new Konva.Shape({
        x: -541.5,
        y: -543,
        width: canvasWidth,
        height: canvasHeight,
        name: 'grid',
        stroke: stk,
        strokeWidth: sw,
        sceneFunc: function (context, shape) {
            var bw = canvasWidth+1541;
            var bh = canvasHeight+1541;
            var p = 15;
            for (var x = 0; x <= bw; x += 30) {
                context.moveTo(0.5 + x + p, p);
                context.lineTo(0.5 + x + p, bh + p);
            }
            for (var x = 0; x <= bh; x += 30) {
                context.moveTo(p, 0.5 + x + p);
                context.lineTo(bw + p, 0.5 + x + p);
            }
            context.strokeStyle = "#EFEBF9";
            context.stroke();
        }
    });
    layer.add(grid);
    layer.draw();
}


window.onload = init;