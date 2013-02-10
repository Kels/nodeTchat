jQuery(function($){    
    $.post('getServer.php', {req : '453194de17c7a4b28727cfb98f1ab8c3'}, function(res){
        var socket = io.connect('http://'+res.server+':1337');

//        paper.setup('myCanvas');
        // Create a simple drawing tool:
        var tool = new Tool();
        var path;
        var color = 'black';
        var points = [];

//        path = new Path();
        
        // Define a mousedown and mousedrag handler
        tool.onMouseDown = function(event) {
            path = new Path();
            path.strokeColor = color;
            path.add(event.point);

            socket.emit('initPath');
        }

        tool.onMouseDrag = function(event) {
            path.add(event.point);
            socket.emit('drawPoint', event.point);
            points.push(event.point);
        }

        tool.onMouseUp = function(e){
            path.simplify(10);
            //socket.emit('drawPoint', points);
            points = [];

            socket.emit('endPath');
        }

        $('#refresh_sheet_btn').click(function(){
            for(var i in project.activeLayer.children){
                var t_path = project.activeLayer.children[i];
                t_path.remove();
            }

            if(project.activeLayer.children.length > 0) $('#refresh_sheet_btn').trigger('click');
        });

        var broadcastedPath;
        socket.on('initPath', function(){
            broadcastedPath = new Path();
        });
        socket.on('endPath', function(){
            broadcastedPath.simplify(10);    
        });

        socket.on('drawPoint', function(point){
            broadcastedPath.strokeColor = 'blue';

            broadcastedPath.add(point);
            // for (var i = points.length - 1; i >= 0; i--) {
            //     var point = new Point(points[i]);
            //     path.add(point);
            // };
        });



    }, 'json');
});