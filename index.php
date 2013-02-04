<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Mon Tchat</title>

	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link rel="stylesheet" type="text/css" href="css/myStyle.css">
	<link rel="stylesheet" type="text/css" href="css/notifs.css">
</head>

<body>

	<div class="container">
		<h1 class="big_title animated swing">Tchat avec NodeJS</h1>
		<hr>

      </p>
		<div class="row">
			<div class="span4" id="list_user">
				<form id="login_form" method="POST">
					<div class="controls-group">
						<label for="username">E-mail</label>
	  					<div class="controls">
							<input name="mail" type="email" id="mail" class="span3">
						</div>
					</div>
					<div class="controls-group">
						<label for="username">Username</label>
	  					<div class="input-append">
							<input name="username" type="text" id="username" class="span2">
							<input type="submit" value="Let's tchat" class="btn">
						</div>
					</div>
				</form>

				<h3>Utilisateurs connectés</h3>
				<ul id="list_users">
					<div class="loader"><img src="img/loader.gif" alt="loading..."></div>
				</ul>		

			</div>

			<div class="span8" id="tchat">
				<h2>Salon</h2>
				<div id="salon">
					<div id="message_body">
						<div class="row-fluid message_body">
							<div class="span12">
								<div class="row-fluid">
									<div class="span2">
										<img src="{{avatar}}">
										<br>{{name}}
									</div>
									<div class="span10">
										<p class="message">{{message}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<form id="message_form" method="POST">
					<div class="controls-group">			
						<label for="message">
							Message
							<a class="btn btn-mini" id="add_equation_btn">Equation</a>
							<!-- <a class="btn btn-mini" id="short_long_btn">Long message</a> -->
						</label>
						<div class="control">
  							<div class="input-append">
  								<span id="equation_windows"></span>
								<input name="message" type="text" id="message" class="span6" rows="5">
<!-- 								<textarea name="message" type="text" id="message_d" class="span6" rows="5" style="display:none;"></textarea> -->
								<input type="submit" value="Envoyer" class="btn">		
							</div>					
						</div>
					</div>
				</form>
			</div>
		</div>


		<footer>
			2013 &copy; KHub.fr
		</footer>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/mustache.js"></script>
	<script type="text/javascript" src="js/jquery.notif.js"></script>

	<script type="text/javascript" src="http://localhost:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/client.js"></script>

</body>
</html>

	