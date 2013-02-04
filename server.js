var http = require('http');
var md5 = require('MD5');

var test = md5("mssage");
httpServer = http.createServer(function(req, res){
	console.log('Lol');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var users = {};

io.sockets.on('connection', function(socket){
	console.log('New user');

	var me = false;

	/**
	* Gestion des users
	*/
	for(var k in users ){
		socket.emit('newUser', users[k]);
	}

	socket.on('login', function(user){
		me = user;

		me.id  = user.username;
		me.username = user.username;
		me.mail = user.mail;
		me.avatar = 'https://gravatar.com/avatar/'+md5(me.mail)+'?s=50';

		socket.broadcast.emit('logged', me);

		io.sockets.emit('newUser', me);

		users[me.id] = me;
	});

	socket.on('disconnect', function(){
		if(!me){
			return false;
		}

		delete users[me.id];
		socket.broadcast.emit('disUser', me);
	});

	/**
	* Gestion des messages
	*/
	socket.on('sendMessage', function(message){
		io.sockets.emit('addMessage', {user: me, message: message});
	});

	socket.on('writeMessage', function(){
		socket.broadcast.emit('addWriteNotif', me);
	});

	socket.on('resetMessage', function(){
		socket.broadcast.emit('removeWriteNotif', me);
	});
});