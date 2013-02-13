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
		<h1 class="big_title"></h1>
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
				<h2 id="topic">Salon</h2>

				
				<div id="salon">
					<template id="message_body" class="hidden">
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
					</template>
					<div id="messages"></div>
				</div>

				<form id="message_form" class="form-inline" method="POST">
					<p>
						<a class="btn btn-mini" id="add_equation_btn">Equation</a>
						<a class="btn btn-mini" id="draw_btn">Draw</a>					    
					</p>
					<input name="message" type="text" id="message" class="span6" rows="5" autofocus placeholder="Message ...">
<!-- 								<textarea name="message" type="text" id="message_d" class="span6" rows="5" style="display:none;"></textarea> -->
					<input type="submit" value="Envoyer" class="btn">		
				</form>
			</div>
		</div>

		<footer>
			2013 &copy; KHub <span class="pull-right">
			Contact | Mention légale</span>
		</footer>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script type="text/javascript" src="http://<?php echo $_SERVER['HTTP_HOST'] ?>:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/mustache.js"></script>
	<script type="text/javascript" src="js/jquery.notif.js"></script>
    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>
	<script type="text/javascript" src="js/jquery.equation.js"></script>

	<script type="text/javascript" src="js/paper.js"></script>

	<script type="text/javascript" src="js/jquery.draw.js"></script>
	<script type="text/javascript" src="js/jquery.cmenu.js"></script>

	<script type="text/javascript" src="js/client.js"></script>

	<script type="text/x-mathjax-config">
		MathJax.Hub.Config({
		  "HTML-CSS": { linebreaks: { automatic: true } },
		         "SVG": { linebreaks: { automatic: true } }
		});
	</script>

	<div id="magicalBoard">
			<div id="magicalBoardToolBar">
				<a href="#" id="close_sheet_btn" class="pull-right"><i class="icon-remove icon-white"></i></a>
				<!-- <a href="#" id="refresh_sheet_btn"><i class="icon-refresh icon-white"></i></a>
				<a href="#" id="pencilToolBar"><i class="icon-pencil icon-white"></i></a>
				<a href="#" id="selectToolBar"><i class="icon-edit icon-white"></i></a>
				<a href="#" id="removeToolBar"><i class="icon-remove-sign icon-white"></i></a>
				<a href="#" id="rectangleToolBar">Rect</a> -->
			</div>
			<div id="favoriteColor">
				<div class="color1"></div>
				<div class="color2"></div>
				<div class="color3"></div>
				<div class="color4"></div>
			</div>
						
			<script type="text/paperscript" canvas="myCanvas" src="js/test.js" data-paper-loaded="true"></script>
			<div id="drawSheet">
				<canvas id="myCanvas" width="618px" height="500px" ></canvas>
			</div>
		</div>
</body>
</html>

	