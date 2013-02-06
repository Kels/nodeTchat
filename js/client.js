jQuery(function($){
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
	var socket = io.connect('http://localhost:1337');

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
			socket.emit('sendMessage', message);
			$message.val('');
			$message.focus();
		}
	})

	$message.keyup(function(){
		if($message.val()){
			socket.emit('writeMessage');
		}
		else{
			socket.emit('resetMessage');
		}
	});

	socket.on('addMessage', function(data){
		var res = Mustache.render(message_template, {name: data.user.username, avatar : data.user.avatar, message : data.message});

		$messages.append(res);

		$('#'+data.user.id+' .is_writting').fadeOut();

		/**
		* Scroll vers le bas
		*/
		$messages.animate({scrollTop : $messages.prop('scrollHeight') + 74}, 500);
	});

	socket.on('addWriteNotif', function(user){
		$('#'+user.id+' .is_writting').fadeIn();
	});

	socket.on('removeWriteNotif', function(user){
		$('#'+user.id+' .is_writting').fadeOut();
	});

	/**
	* functionnalités
	*/
	socket.on('playBeep', function(){
		var $beep = $('<audio id="beep" autoplay><source src="audio/beep.mp3" type="audio/mpeg"></audio>');
		$('#beep').remove();
		$('#tchat').append($beep);
	});

	$('#add_equation_btn').click(function(){
		$.get('http://webdemo.visionobjects.com/equation.html', function(res){
			$('#message_form').append(res);
		});
	});

	$('#short_long_btn').click(function(){
		var txt = $(this).text();

		if(txt == 'Long message'){
			$(this).text('Short message');

			$('input[name="message"]').fadeOut(function(){
				$(this).attr('id', 'message_d');
				$('textarea[name="message"]').fadeIn().attr('id', 'message');
			});
		}
		else{
			$(this).text('Long message');

			$('textarea[name="message"]').fadeOut(function(){
				$(this).attr('id', 'message_d');
				$('input[name="message"]').fadeIn().attr('id', 'message');
			});
		}
	});

	$('.message_body').fadeOut();
});

/**
* Useful function
*/
function resize_windows($salon, $messages){
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
		winH -= 202;

		$salon.css({
			'height':winH+'px',
			'max-height':winH+'px',
		});		

		winH -= 65;
		$messages.css({
			'height':winH+'px',
			'max-height':winH+'px',
		});
}