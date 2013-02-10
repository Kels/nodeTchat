jQuery(function($){
	$.fn.draw = function(options){
		var options = $.extend({
			width : 400,
			height : 300,
		}, options);

		this.css({
			// 'top'	: 500+'px',
			// 'position' 	: 'fixed',
			'background-color' : 'yellow'
		});

var path;

var textItem = new paper.PointText(new paper.Point(20, 55));
textItem.fillColor = 'black';
textItem.content = 'Click and drag to draw a line.';

function onMouseDown(event) {
    // If we produced a path before, deselect it:
    if (path) {
        path.selected = false;
    }

    // Create a new path and set its stroke color to black:
    path = new paper.Path();
    path.add(event.point);
    path.strokeColor = 'black';

    // Select the path, so we can see its segment points:
    path.fullySelected = true;
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
    path.add(event.point);

    // Update the content of the text item to show how many
    // segments it has:
    textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
    var segmentCount = path.segments.length;

    // When the mouse is released, simplify it:
    path.simplify(10);

    // Select the path, so we can see its segments:
    path.fullySelected = true;

    var newSegmentCount = path.segments.length;
    var difference = segmentCount - newSegmentCount;
    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}
	}
});