
    var socket = io.connect('http://localhost:1337');

        paper.setup('myCanvas');
        // Create a simple drawing tool:
        var tool = new Tool();
        var path;
        var color = 'black';
        var points = [];

        path = new Path();
        
        // Define a mousedown and mousedrag handler
        tool.onMouseDown = function(event) {
            path = new Path();
            path.strokeColor = color;
            path.add(event.point);
        }

        tool.onMouseDrag = function(event) {
            path.add(event.point);
            points.push(event.point);
        }

        tool.onMouseUp = function(e){
            var pathBuffer = path.simplify(50);
            socket.emit('drawPoint', points);
            points = [];
        }

        tool1 = new Tool();
        tool1.onMouseDown = onMouseDown;

        tool1.onMouseDrag = function(event) {
            path.add(event.point);
        }

        tool2 = new Tool();
        tool2.minDistance = 20;
        tool2.onMouseDown = onMouseDown;

        tool2.onMouseDrag = function(event) {
            // Use the arcTo command to draw cloudy lines
            path.arcTo(event.point);
        }



jQuery(function($){

    socket.on('drawPoint', function(points){
        path = new Path();
        path.strokeColor = color;
        
        for (var i = points.length - 1; i >= 0; i--) {
            var point = new Point(points[i]);
            path.add(point);
        };
        path.simplify(50);    
    });

});