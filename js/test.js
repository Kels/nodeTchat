jQuery(function($){    
    $.post('getServer.php', {req : '453194de17c7a4b28727cfb98f1ab8c3'}, function(res){
        var socket = io.connect('http://'+res.server+':1337');

//        paper.setup('myCanvas');
        // Create a simple drawing tool:
        var pencil = new Tool();
        var select = new Tool();
        var remove = new Tool();
        var rectangle = new Tool();
        var path;
        var color = 'black';
        var points = [];

        /**
        * Pencil Tool
        */
        pencil.onMouseDown = function(event) {
            path = new Path();
            path.strokeColor = color;
            path.add(event.point);

            socket.emit('initPath', {
                color : color,
            });
        }

        pencil.onMouseDrag = function(event) {
            path.add(event.point);
            socket.emit('drawPoint', event.point);
            points.push(event.point);
        }

        pencil.onMouseUp = function(e){
            path.simplify(10);
            //socket.emit('drawPoint', points);
            points = [];

            socket.emit('endPath');
        }

        /**
        * Rectangle Tool
        */
        var rectTopLeft;
        var rectWidth;
        var rectHeight;
        var rectSize;
        var rect;
        var pathRectTmp;
        rectangle.onMouseDown = function(e){
            rectTopLeft = e.point;
        }

        rectangle.onMouseDrag = function(e){
            if(pathRectTmp) pathRectTmp.remove();

            rectWidth = e.point.x - rectTopLeft.x;
            rectHeight = e.point.y - rectTopLeft.y;
            rectSize = new Size(rectWidth, rectHeight);
            rect = new Rectangle(rectTopLeft, rectSize);

            pathRectTmp = new Path.Rectangle(rect);
            pathRectTmp.strokeColor = color;
        }

        rectangle.onMouseUp = function(e){
            pathRectTmp.remove();
            path = new Path.Rectangle(rect);
            path.strokeColor = color;

            socket.emit('drawRectangle', {topLeft : rectTopLeft, size : rectSize, color : color});
        }

        /**
        * Select Tool
        */
        var hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        };

        var selectedPath = false;
        select.onMouseMove = function(event) {
            var hitResult = project.hitTest(event.point, hitOptions);

            project.activeLayer.selected = false;
            if (hitResult && hitResult.item){
                hitResult.item.selected = true;

                selectedPath = hitResult.item;
            }
        }
        select.onMouseDown = function(e){
            selectedPath.selected = true;
        }

        /**
        * Remove Tool
        */
        var pathToRemove = false;
        remove.onMouseMove = function(event) {
            var hitResult = project.hitTest(event.point, hitOptions);

            project.activeLayer.selected = false;
            pathToRemove = false;
            if (hitResult && hitResult.item){
                hitResult.item.selected = true;
                pathToRemove = hitResult.item;
            }
        }

        remove.onMouseDown = function(e){
            if(pathToRemove) pathToRemove.remove();
        }

        /**
        * Manage ToolBar
        */
        $('#pencilToolBar').click(function(){
            pencil.activate();
            $(this).css('opacity', 1).siblings().css('opacity', 0.6);
        }); 

        $('#rectangleToolBar').click(function(){
            rectangle.activate();
            $(this).css('opacity', 1).siblings().css('opacity', 0.6);
        });  

        $('#selectToolBar').click(function(){
            select.activate();
            $(this).css('opacity', 1).siblings().css('opacity', 0.6);
        });

        $('#removeToolBar').click(function(){
            remove.activate();
            $(this).css('opacity', 1).siblings().css('opacity', 0.6);
        });

        $('#refresh_sheet_btn').click(function(){
            for(var i in project.activeLayer.children){
                var t_path = project.activeLayer.children[i];
                t_path.remove();
            }

            if(project.activeLayer.children.length > 0) $('#refresh_sheet_btn').trigger('click');
        });

        /**
        * Color
        */
        $('#favoriteColor div').click(function(){
            color = $(this).css('background-color');
            $(this).css('opacity', '1').siblings().css('opacity', '0.3');
        });

        /**
        * Link board
        */
        var broadcastedPath;
        socket.on('initPath', function(data){
            broadcastedPath = new Path();

            broadcastedPath.strokeColor = data.color;
        });
        socket.on('endPath', function(){
            broadcastedPath.simplify(10);    
        });

        socket.on('drawPoint', function(point){
            broadcastedPath.add(point);
            // for (var i = points.length - 1; i >= 0; i--) {
            //     var point = new Point(points[i]);
            //     path.add(point);
            // };
        });

        socket.on('drawRectangle', function(data){
            var broadcastedRect = new Rectangle( data.topLeft, data.size);
            broadcastedPath = new Path.Rectangle(broadcastedRect);
            broadcastedPath.strokeColor = data.color;
        })

    }, 'json');
});