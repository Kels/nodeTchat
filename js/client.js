jQuery(function($){
	var socket = io.connect('http://localhost:1337');
	
	var $salon = $('#salon');
	var username = false;

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

	socket.on('logged', function(user){
		$salon.prepend('<p class="new_user_notif">' + user.username + ' vient de se connecter</p>');
	});

	socket.on('newUser', function(user){
		$('#list_user .loader').remove();
		$('#list_user ul').append('<li id="' + user.username +'"><img src="'+user.avatar+'"> ' + user.username + ' <span class="is_writting"><i class="icon-pencil"></i></span></li>');
	});

	socket.on('disUser', function(user){
		$('#'+user.id).remove();

		$salon.prepend('<p class="new_user_notif">' + user.username + ' vient de se déconnecter</p>');
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
		var res = '<div class="row-fluid message_body">';
		res += '<div class="span12">';
		res += '<div class="row-fluid">';
		res += '<div class="span2">';
		res += '<img src="'+data.user.avatar+'">';
		res += '<br>'+data.user.id;
		res += '</div>';
		res += '<div class="span10">';
		res += '<p class="message">'+data.message+'</p>';
		res += '</div>';
		res += '</div>';
		res += '</div>';
		res += '</div>';

		$salon.prepend(res);

		$('#'+data.user.id+' .is_writting').fadeOut();
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
});