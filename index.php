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
		<h1 class="big_title">Bienvenue dans une e-Class</h1>
		<hr>

      </p>
		<div class="row">
			<div class="span4" id="list_user">
				<h4>Utilisateurs connectés</h4>
				<ul id="list_users">
					<div class="loader"><img src="img/loader.gif" alt="loading..."></div>
				</ul>	

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
			</div>

			<div class="span8" id="tchat">
				<h2>Salon</h2>
				<div id="salon">
					<div id="message_body" class="hidden">
						<div class="row-fluid message_body" data-author="{{name}}">
							<div class="span12">
								<div class="row-fluid">
									<div class="message_avatar">
										<img src="{{avatar}}">
									</div>
									<div class="message_text">
										<h5>{{name}}<small class="pull-right">{{time}}</small></h5>
										<p class="message">{{message}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="messages"></div>
				</div>

				<form id="message_form" class="form-inline" method="POST">
					<p>
						<a class="btn btn-mini" id="add_equation_btn">Equation</a>
					</p>
					<input name="message" type="text" id="message" class="span6" rows="5" autofocus placeholder="Message ...">
<!-- 								<textarea name="message" type="text" id="message_d" class="span6" rows="5" style="display:none;"></textarea> -->
					<input type="submit" value="Envoyer" class="btn">		
				</form>
			</div>
		</div>


		<footer>
			2013 &copy; KHub <span class="pull-right"><a href="math.html">Contact</a> | Mention légale</span>
		</footer>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/mustache.js"></script>
	<script type="text/javascript" src="js/jquery.notif.js"></script>
    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>
	<script type="text/javascript" src="js/jquery.equation.js"></script>

	<script type="text/javascript" src="http://localhost:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  "HTML-CSS": { linebreaks: { automatic: true } },
         SVG: { linebreaks: { automatic: true } }
});
</script>
</body>
</html>

	