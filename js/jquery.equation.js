jQuery(function($){
	$.fn.equation = function(options){
		var options = $.extend({
			html : '<div class="equationForm animated fadeInLeft">\
						<div class="equationPreview">Apercu</div>\
						<div class="equationEditor">\
							<textarea></textarea><br>\
							<button id="validEquation" type="button">Ajouter l\'équation</button>\
						</div>\
					</div>',
			position : 'top'
		}, options);

		$('.equationForm').fadeOut(function(){
			$(this).remove();
		});

		this.after(options.html);
		var $form = $('.equationForm');

		var top = this.offset().top - $form.height();
		var left = this.offset().left;

		$form.css({
			top : top+'px',
		});


		var $textarea = $('.equationEditor textarea');
		
		$textarea.keyup(function(){
            var text = $(this).val();

            $('.equationPreview').html('\\( '+text+' \\)');

            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       	});

		$('#validEquation').click(function(){
			$(options.dest).val($(options.dest).val()+ '[eq]'+$textarea.val().trim()+ '[/eq]');
			$form.fadeOut(function(){
				$(this).remove();
			});
		});
	}
});