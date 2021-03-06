jQuery(function($){
	/**
	* Récupérer le serveur
	*/
	
	$.post('getServer.php', {req : '453194de17c7a4b28727cfb98f1ab8c3'}, function(res){
		var socket = io.connect('http://'+res.server+':1337');

		/**
		* Détecter la hauteur
		*/
		var $salon = $('#salon');
		var $messages = $('#messages');

		resize_windows($salon, $messages);

		$(window).resize(function() {	
			resize_windows($salon, $messages);
		});

		/**
		* Partie client
		*/
		var username = false;

		var message_template = $('#message_body').html();
		$('#message_body').remove();

		/**
		* Gestion des users
		*/	
		$('#login_form').submit(function(event){
			event.preventDefault();

			username = $('#username').val().split(' ').join('_');
			mail	 = $('#mail').val().trim();
	 
			if(username){
				if($('#'+username).text()){
					$(this).append("<br>Nom d'utilisateur déjà utilisé.");
				}
				else{
					socket.emit('login', {
						username : username,
						mail     : mail,
					});

					$(this).fadeOut(function(){
						$('#message_form').fadeIn();
						$('title').prepend(username+' - ');
						$(this).remove();
					});	
				}
			}
			else{
				$(this).append("<br>Veuillez saisir un nom d'utilisateur.");
			}

		});

		socket.on('newUser', function(user){
			$('#list_user .loader').remove();
			$('#list_user ul').append('<li id="' + user.username +'"><img src="'+user.avatar+'"> ' + user.username + ' <span class="is_writting"><i class="icon-pencil"></i></span></li>');
		});

		socket.on('logged', function(user){
			$('body').notif({
				title : 'Nouvel utilisateur',
				content : user.username+' vient de se connecter.',
				img : user.avatar,
			});
		});

		socket.on('disUser', function(user){
			$('#'+user.id).remove();
			$('body').notif({
				title : "Déconnection d'utilisateur",
				content : user.username+' vient de se déconnecter.',
				img : user.avatar,
			});
		});

		/**
		* Gestion des messages
		*/
		var $message = $('#message');

		$('#message_form').submit(function(event){
			event.preventDefault();

			var message = $message.val();

			if( message ){
				/**
				* Parse message
				*/
				message = message.split('[eq]').join('\\(').split('[/eq]').join('\\)');

				socket.emit('sendMessage', message);
				$message.val('');
				$message.focus();
			}
		})

		$message.keyup(function(){
			if($message.val()){
				if($message.val().length ==1) socket.emit('writeMessage');
			}
			else{
				socket.emit('resetMessage');
			}
		});

		socket.on('addMessage', function(data){    
			var currentTime = new Date()
		    var hours = currentTime.getHours()
		    var minutes = currentTime.getMinutes()
		    var seconds = currentTime.getSeconds()
		    if (minutes < 10) {
		        minutes = "0" + minutes
		    }
		    if (seconds < 10) {
		        seconds = "0" + seconds
		    }

		    var str_time = hours+':'+minutes;

			var $last_message = $('.message_body:last');
			var last_author = $last_message.attr('data-author');

			/**
			* Injection de données dans le template
			*/
			var res = Mustache.render(message_template, {name: data.user.username, avatar : data.user.avatar, message : data.message, time : str_time});

			if( $last_message.length == 0 ){ 
				$messages.append(res);
			}
			else {
				if( last_author == data.user.username ){
					$last_message.find('.message:last').after('<p class="message">'+data.message+'</p>');
				}
				else{
					$messages.append(res);
				}
			}

			$('#'+data.user.id+' .is_writting').fadeOut().parent().removeClass('isWritting');

			/**
			* MathJax render
			*/
	        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			/**
			* Scroll vers le bas
			*/
			$messages.animate({scrollTop : $messages.prop('scrollHeight') + 74}, 500, function(){
				$('.message_text').css({'width':'520px'});
			});
		});

		socket.on('addWriteNotif', function(user){
			$('#'+user.id+' .is_writting').fadeIn().parent().addClass('isWritting');
		});

		socket.on('removeWriteNotif', function(user){
			$('#'+user.id+' .is_writting').fadeOut().parent().removeClass('isWritting');
		});

		/**
		* Tableau magique
		*/	
	    var $magicalBoard = $('#magicalBoard');
	    $('#magicalBoardToolBar').mousedown(function(){
	    	$magicalBoard.draggable();
	    }).mouseup(function(){
	    	$magicalBoard.draggable('destroy');
	    });

		$('#draw_btn').click(function(){
			$magicalBoard.fadeIn();
			$('#trait').trigger('click');

			socket.emit('initSheet');
		});

	    $('#close_sheet_btn').click(function(){
	        $magicalBoard.fadeOut();
	    });

		socket.on('initSheet', function(){
			$magicalBoard.fadeIn();
		});

		/**
		* functionnalités
		*/
		socket.on('playBeep', function(){
			var $beep = $('<audio id="beep" autoplay><source src="audio/beep.mp3" type="audio/mpeg"><source src="audio/beep.wav" type="audio/wav"></audio>');
			if($('#beep')) $('#beep').remove();
			$('#tchat').append($beep);
		});

		$('#add_equation_btn').click(function(){
			$(this).equation({dest : '#message'});
		});

	}, 'json');
});

/**
* Useful function
*/
function resize_windows($salon, $messages){
	var footer = $('footer').height();
	var $salon = $('#messages');
	var $message_form = $('#message_form');

	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
	    document.documentElement &&
	    document.documentElement.offsetWidth ) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	
	$('.container').css({
		'height': winH+'px'
	});

	$salon.css({
		'height':winH+'px',
		'max-height':winH+'px',
	});		

	messagesH = winH - ( $message_form.height() + footer + $('#tchat').position().top +$('#salon').position().top - 18 );

	$messages.css({
		'height':messagesH+'px',
		'max-height':messagesH+'px',
	});
}