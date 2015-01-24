<?php
	echo'
	<nav>
	<ul>
		<li><a href="../">Home</a></li>
		<li><a href="/Administration">Admin</a>
			<ul class="dropList">
				<li><a href="">Sub-page 1.1</a></li>
				<li><a href="">Sub-page 1.2</a></li>
				<li><a href="">Sub-page 1.3</a></li>
			</ul>
		</li>
		<li id="basket">
			<a href="../basket.php"><img src="../Images/basket.png"><div id="numItems"></div></a>
		</li>
		<li id="search">
			<form id="searchForm" action="../search.php">
				<input placeholder="Search..." id="searchBox" type="search" name="search" autocomplete="off" required>
				<input id="searchButton" type="submit" value="Search">
				<div id="searchSuggestion"></div>
			</form>
		</li>
	</ul>
	</nav>
	'
?>
