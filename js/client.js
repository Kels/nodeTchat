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
			socket.emit('writeMessage');
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
		$messages.animate({scrollTop : $messages.prop('scrollHeight') + 74}, 500);
	});

	socket.on('addWriteNotif', function(user){
		$('#'+user.id+' .is_writting').fadeIn().parent().addClass('isWritting');
	});

	socket.on('removeWriteNotif', function(user){
		$('#'+user.id+' .is_writting').fadeOut().parent().removeClass('isWritting');
	});

	/**
	* functionnalités
	*/
	socket.on('playBeep', function(){
		var $beep = $('<audio id="beep" autoplay><source src="audio/beep.mp3" type="audio/mpeg"><source src="audio/beep.wav" type="audio/wav"></audio>');
		$('#beep').remove();
		$('#tchat').append($beep);
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

	$('#add_equation_btn').click(function(){
		// $('#message').val( $('#message').val()+' [eq]  [/eq]' );
		$(this).equation({dest : '#message'});
	});

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

	winH -= 64;
	$messages.css({
		'height':winH+'px',
		'max-height':winH+'px',
	});
}