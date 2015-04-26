<?php
	echo'
	<nav>
	<ul>
		<li id="homeNav"><a href="../">Home</a></li>
		<li id="categoriesNav">
			<a>Categories</a>
		</li>
		<li id="basket">
			<a><img src="../Images/basket.png" alt="Basket icon"><div id="numItems"></div></a>
		</li>
		<li id="search">
			<form id="searchForm">
				<input placeholder="Search..." id="searchBox" type="search" autocomplete="off" required autofocus>
				<button id="searchButton">Search</button>
				<div id="searchSuggestion"></div>
			</form>
		</li>
	</ul>
	</nav>
	'
?>
