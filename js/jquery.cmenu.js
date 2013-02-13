jQuery(function($){
	$.fn.cmenu = function(options){
		var options = $.extend({
		}, options);

		var html = '<ul class="cmenu">';

		for(var i in options){
			html +='<li id="'+options[i].id+'"';
			
			if(options[i].separated){
				html += ' class="separated"';
			}

			html += '>'+options[i].label+'</li>'; 
		}
		html += '</ul>';

		var css = {
			'position' : 'absolute',
			'border' : '1px solid #555',
			'background-color' : '#EEE',
			'list-style' : 'none',
			'margin' : '0px',
			'cursor' : 'pointer',
			'font-size' : '10px'
		};

		var liCss = {
			'padding' : '2px 5px',
			'border-bottom' : '1px solid #CCC',
		}

		this.css('position', 'relative');

		this.bind('contextmenu', function(e){
			var currentTool = $(this).attr('data-tool');

			var canvasPosition = $(this).parent().parent().position();
			
			$(this).after(html);
			
			css.left = (e.pageX - (canvasPosition.left))+'px',
			css.top = (e.pageY - (canvasPosition.top))+'px',
			
			$('.cmenu').css(css);	
			$('.cmenu li').css(liCss);
			$('.cmenu li.separated').css({
				'border-top' : '1px solid #666'
			});


			$('#'+currentTool).css({
				'background-color' : '#CCC',
			});

			return false;
		});

		this.click(function(){
			$('.cmenu').slideUp();
		});

		$(document).on('click', '.cmenu li', function(){
			$(this).css({
				'background-color' : '#CCC',
			}).siblings().css({
				'background-color' : '#DDD',
			});

			$('.cmenu').slideUp();

			$('#myCanvas').attr('data-tool', $(this).attr('id'));
		})
	}
});