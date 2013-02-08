jQuery(function($){
	$.fn.notif = function(options){

		var options = $.extend({
			html : '<div class="notification animated fadeInLeft">\
						<div class="left"><img src="{{img}}"></div>\
						<div class="right">\
							<h2>{{title}}</h2>\
							<p>{{content}}</p>\
						</div>\
					</div>'
		}, options);

		return this.each(function(){
			var $this = $(this);

			// Rechercher s'il y a un enfant direct
			var $notifs = $('> .notifications', this);
			var $notif = $(Mustache.render(options.html, options));

			if($notifs.length == 0){
				$notifs = $('<div class="notifications animated flipInX" />');

				$this.append($notifs);
			}

			$notifs.append($notif);

			$notif.click(function(e){
				e.preventDefault();
				$notif.addClass('fadeOutRight').delay(500).slideUp(300, function(){
					$notif.remove();
				});
			});

			$notif.addClass('fadeOutRight').delay(3000).slideUp(300, function(){
				$notif.remove();

				if($notifs.text().length == 0){
					$notifs.remove();
				}
			});
		});
	}

});