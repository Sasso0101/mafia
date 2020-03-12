/* Opens the pop-up window */
function displayItem(id, json) {
	if (window.animState == 'exec') {
		return;
	}
	window.animState = 'exec';
	var timeline = document.getElementById("timeline"),
	logo = document.getElementById("logo"),
	navbar = document.getElementsByTagName("nav")[0],
	closeItem = document.getElementById("closeItem"),
	credits = document.getElementById("credits");
	navbar.style.pointerEvents = 'none';
	credits.style.display = "none";
	timeline.style.pointerEvents = 'none';
	timeline.style.marginBottom = '0';
	timeline.style.opacity = 0;
	logo.style.opacity = 0;
	navbar.style.opacity = 0;
	setTimeout(function(){
		item = document.getElementById("item");
		item.innerHTML = json[id].html;
		item.style.opacity = 1;
		setTimeout(function(){
			logo.style.marginTop = '0';
			navbar.style.marginTop = '0';
			logo.style.marginBottom = '0';
			timeline.style.height = '0';
			navbar.style.height = '0';
			logo.style.height = '0';
			item.style.height = 'calc(100vh - 100px)';
			closeItem.style.display = 'block';
			setTimeout(function() {
				timeline.style.display = 'none';
				logo.style.display = 'none';
				navbar.style.display = 'none';
				timeline.style.marginTop = '0';
				timeline.style.pointerEvents = '';
				window.animState = 'stopped';
			}, 900)
		}, 100)
	}, 500);
}

/* Closes the pop-up window */
function hideItem() {
	if (window.animState == 'exec') {
		return;
	}
	window.animState = 'exec';
	var timeline = document.getElementById("timeline"),
	logo = document.getElementById("logo"),
	navbar = document.getElementsByTagName("nav")[0],
	item = document.getElementById("item");
	item.style.opacity = 0;
	item.style.height = '0';
	logo.style.display = '';
	navbar.style.display = '';
	timeline.style.display = '';
	setTimeout(function(){
		logo.style.height = '30vh';
		logo.style.opacity = '';
		logo.style.marginTop = '';
		logo.style.marginBottom = '';
		timeline.style.height = '';
		navbar.style.opacity = '';
		navbar.style.marginTop = '';
		navbar.style.height = '';
		timeline.style.marginTop = '';
		closeItem.style.display = '';
		setTimeout(function(){
			item.innerHTML = '';
			timeline.style.marginBottom = '';
			timeline.style.opacity = '';
			credits.style.display = '';
			navbar.style.pointerEvents = '';
			window.animState = 'stopped';
		}, 800);
	}, 200);
}

/* Crossfade animation */
function changeTitle(id, json) {
	var crossfade1 = document.getElementById("itemNameCF1"),
	crossfade2 = document.getElementById("itemNameCF2");
	if (crossfade1.style.opacity == 1) {
		crossfade2.innerHTML = json[id].label;
	} else {
		crossfade1.innerHTML = json[id].label;
	}
	tmp = crossfade1.style.opacity;
	crossfade1.style.opacity = crossfade2.style.opacity;
	crossfade2.style.opacity = tmp;
}

/* Reloads the site with the chosen language - use it to set change language */
function changeLanguage(lang) {
	document.getElementById("timeline").innerHTML = '';
	url = getLocalizedJsonUrl(lang);
	readJSON(url);
}